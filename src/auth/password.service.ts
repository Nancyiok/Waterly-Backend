import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { type Response } from 'express';
import { UserService } from '../users/users.service';
import { UserCredentialsService } from '../users/user-credentials.service';
import { EmailService } from './email.service';
import { TokenService } from './token.service';
import { AUTH } from '../common/constants/auth.constant';
import { AUTH_MESSAGES } from '../common/constants/response-messages/auth.constants';
import {
  generateToken,
  getTokenExpiresAt,
  isTokenExpired,
} from '../common/utils/auth-token.util';

@Injectable()
export class PasswordService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly userCredentialsService: UserCredentialsService,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService,
  ) {}

  hash(password: string) {
    const rounds = Number(
      this.configService.get('BCRYPT_PASSWORD_ROUNDS') ??
        AUTH.DEFAULT_BCRYPT_ROUNDS,
    );
    return bcrypt.hash(password, rounds);
  }

  compare(password: string, passwordHash?: string | null) {
    return bcrypt.compare(password, passwordHash ?? '');
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }

    const resetToken = generateToken();
    await this.userCredentialsService.updateCredentials(user.id, {
      resetToken,
      resetTokenExpiresAt: getTokenExpiresAt(AUTH.RESET_TOKEN_TTL_HOURS),
    });
    void this.emailService.sendPasswordResetEmail(user.email, resetToken);
    return null;
  }

  async resetPassword(token: string, newPassword: string, res: Response) {
    const user = await this.userCredentialsService.findByResetToken(token);
    const credentials = user?.credentials;
    if (!user || !credentials?.resetToken) {
      throw new BadRequestException(AUTH_MESSAGES.INVALID_RESET_TOKEN);
    }
    if (isTokenExpired(credentials.resetTokenExpiresAt)) {
      throw new BadRequestException(AUTH_MESSAGES.RESET_TOKEN_EXPIRED);
    }
    if (await this.compare(newPassword, credentials.passwordHash)) {
      await this.clearResetToken(user.id);
      throw new BadRequestException(AUTH_MESSAGES.SAME_PASSWORD);
    }

    await this.clearResetToken(user.id, await this.hash(newPassword));

    return this.tokenService.authorize(user, res);
  }

  private clearResetToken(userId: number, passwordHash?: string) {
    return this.userCredentialsService.updateCredentials(userId, {
      passwordHash,
      resetToken: null,
      resetTokenExpiresAt: null,
    });
  }
}
