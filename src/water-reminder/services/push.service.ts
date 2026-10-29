import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cert, initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import { PrismaService } from '../../prisma/prisma.service';
import { PUSH } from '../../common/constants/water-reminder.constant';
import { WATER_REMINDER_MESSAGES } from '../../common/constants/response-messages/water-reminder.constants';

@Injectable()
export class PushService implements OnModuleInit {
  private readonly logger = new Logger(PushService.name);
  private isConfigured = false;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    try {
      initializeApp({
        credential: cert({
          projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
          clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
          privateKey: this.configService
            .get<string>('FIREBASE_PRIVATE_KEY')
            ?.replace(PUSH.ESCAPED_NEWLINE, '\n'),
        }),
      });
      this.isConfigured = true;
    } catch (error) {
      this.logger.error(
        `${WATER_REMINDER_MESSAGES.PUSH_DISABLED}: ${(error as Error).message}`,
      );
    }
  }

  async registerToken(userId: number, token: string) {
    await this.prisma.pushToken.upsert({
      where: { token },
      create: { userId, token },
      update: { userId },
    });
  }

  async removeToken(userId: number, token: string) {
    await this.prisma.pushToken.deleteMany({ where: { userId, token } });
  }

  async sendReminder(userId: number) {
    if (!this.isConfigured) return;

    const tokens = await this.prisma.pushToken.findMany({
      where: { userId },
      select: { token: true },
    });
    if (tokens.length === 0) return;

    const message = {
      notification: { title: PUSH.TITLE, body: PUSH.BODY },
      webpush: {
        notification: {
          icon: PUSH.ICON,
          badge: PUSH.BADGE,
          tag: PUSH.TAG,
          renotify: true,
        },
        fcmOptions: { link: this.configService.get<string>('APP_URL') },
      },
    };
    const { responses, failureCount } = await getMessaging().sendEach(
      tokens.map(({ token }) => ({ ...message, token })),
    );
    if (failureCount === 0) return;

    const deadTokens = tokens.flatMap(({ token }, i) =>
      PUSH.DEAD_TOKEN_CODES.includes(responses[i].error?.code ?? '')
        ? [token]
        : [],
    );
    await this.prisma.pushToken.deleteMany({
      where: { token: { in: deadTokens } },
    });
  }
}
