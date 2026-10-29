import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AUTH } from '../common/constants/auth.constant';
import { AUTH_MESSAGES } from '../common/constants/response-messages/auth.constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        const token = req?.cookies?.[AUTH.REFRESH_TOKEN_COOKIE];
        if (!token) {
          return null;
        }
        return token;
      },
      secretOrKey: String(configService.get<string>('JWT_REFRESH_SECRET')),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req.cookies?.[AUTH.REFRESH_TOKEN_COOKIE];
    if (!refreshToken) {
      throw new UnauthorizedException(AUTH_MESSAGES.REFRESH_TOKEN_MISSING);
    }
    return { ...payload, refreshToken };
  }
}