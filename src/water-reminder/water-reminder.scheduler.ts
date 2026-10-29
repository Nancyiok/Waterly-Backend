import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { type WaterReminderSettings } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PushService } from './services/push.service';
import { getNextReminderAt } from './utils/reminder-time.util';
import { WATER_REMINDER_MESSAGES } from '../common/constants/response-messages/water-reminder.constants';

@Injectable()
export class WaterReminderScheduler {
  private readonly logger = new Logger(WaterReminderScheduler.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly pushService: PushService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async sendDueReminders() {
    const now = new Date();
    const dueSettings = await this.prisma.waterReminderSettings.findMany({
      where: { enabled: true, nextReminderAt: { lte: now } },
    });

    await Promise.all(
      dueSettings.map((settings) =>
        this.sendReminder(now, settings).catch((error) =>
          this.logger.error(
            `${WATER_REMINDER_MESSAGES.SEND_FAILED} ${settings.userId}: ${error}`,
          ),
        ),
      ),
    );
  }

  private async sendReminder(now: Date, settings: WaterReminderSettings) {
    await this.prisma.waterReminderSettings.update({
      where: { id: settings.id },
      data: { nextReminderAt: getNextReminderAt(now, settings) },
    });
    await this.pushService.sendReminder(settings.userId);
  }
}
