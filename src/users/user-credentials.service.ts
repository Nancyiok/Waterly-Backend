import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserCredentialsDto } from './dto/update-user-credentials-dto';

@Injectable()
export class UserCredentialsService {
  constructor(private readonly prisma: PrismaService) {}
  async updateCredentials(userId: number, dto: UpdateUserCredentialsDto) {
    return this.prisma.userCredentials.upsert({
      where: { userId },
      update: { ...dto },
      create: {
        userId,
        ...dto,
      },
    });
  }

  async findByResetToken(token: string) {
    return this.prisma.user.findFirst({
      where: {
        credentials: {
          resetToken: token,
        },
      },
      include: {
        credentials: true,
      },
    });
  }

  async findByVerificationToken(token: string) {
    return this.prisma.user.findFirst({
      where: {
        credentials: {
          verificationToken: token,
        },
      },
      include: {
        credentials: true,
      },
    });
  }
}
