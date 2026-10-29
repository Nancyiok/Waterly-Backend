import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { type User } from '@prisma/client';
import { UserService } from '../users/users.service';
import { type Response } from 'express';
import { timeToMs } from '../common/utils/time-to-ms.util';
import { AUTH } from '../common/constants/auth.constant';
import { AUTH_MESSAGES } from '../common/constants/response-messages/auth.constants';
import { UserCredentialsService } from '../users/user-credentials.service';

type AuthUser = Pick<User, 'id' | 'email' | 'role'>;

@Injectable()
export class TokenService {
  constructor(
    private readonly userService: UserService,
    private readonly userCredentialsService: UserCredentialsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async authorize(user: AuthUser, res: Response) {
    const accessToken = await this.createSession(user, res);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async refresh(refreshToken: string, res: Response) {
    if (!refreshToken) {
      throw new UnauthorizedException(AUTH_MESSAGES.REFRESH_TOKEN_MISSING);
    }
    let payload: { sub: number; email: string; role: string };
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_REFRESH_TOKEN);
    }
    const user = await this.userService.findById(payload.sub, true);
    const refreshTokenHash = user?.credentials?.refreshTokenHash;

    if (!user || !refreshTokenHash) {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_REFRESH_TOKEN);
    }

    const isRefreshTokenMatch = await bcrypt.compare(
      refreshToken,
      refreshTokenHash,
    );

    if (!isRefreshTokenMatch) {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_REFRESH_TOKEN);
    }

    return { accessToken: await this.createSession(user, res) };
  }

  async revoke(userId: number, res: Response) {
    await this.userCredentialsService.updateCredentials(userId, {
      refreshTokenHash: null,
    });
    res.clearCookie(AUTH.REFRESH_TOKEN_COOKIE);
    return null;
  }

  private async createSession(user: AuthUser, res: Response) {
    const { accessToken, refreshToken } = await this.generateTokens(user);
    await this.saveRefreshToken(user.id, refreshToken);
    this.setRefreshTokenCookie(res, refreshToken);
    return accessToken;
  }

  private async generateTokens(user: AuthUser) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    });
    return { accessToken, refreshToken };
  }

  private async saveRefreshToken(userId: number, refreshToken: string) {
    const rounds = Number(
      this.configService.get('BCRYPT_TOKEN_ROUNDS') ??
        AUTH.DEFAULT_BCRYPT_ROUNDS,
    );
    const refreshTokenHash = await bcrypt.hash(refreshToken, rounds);
    await this.userCredentialsService.updateCredentials(userId, {
      refreshTokenHash,
    });
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie(AUTH.REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: timeToMs(
        this.configService.get('JWT_REFRESH_COOKIE_MAX_AGE_DAYS'),
      ),
    });
  }
}
