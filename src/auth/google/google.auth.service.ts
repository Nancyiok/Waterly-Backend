import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { type Response } from 'express';
import { getGoogleClient } from '../../common/config/google.client.config';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../users/users.service';
import { UserCredentialsService } from '../../users/user-credentials.service';
import { TokenService } from '../token.service';
import { type TokenPayload } from 'google-auth-library';
import { UserGoogleDataDto } from '../dto/google.login.dto';
import { AUTH_MESSAGES } from '../../common/constants/response-messages/auth.constants';

@Injectable()
export class GoogleAuthService {
  private readonly googleClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly userCredentialsService: UserCredentialsService,
    private readonly tokenService: TokenService,
  ) {
    this.googleClient = getGoogleClient(configService);
  }

  async getUserDataFromGoogle(idToken: string): Promise<UserGoogleDataDto> {
    if (!idToken) {
      throw new UnauthorizedException(AUTH_MESSAGES.GOOGLE_TOKEN_REQUIRED);
    }

    let payload: TokenPayload | undefined;
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      });
      payload = ticket.getPayload();
    } catch {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_GOOGLE_TOKEN);
    }

    if (!payload?.sub || !payload?.email) {
      throw new UnauthorizedException(AUTH_MESSAGES.INCOMPLETE_GOOGLE_DATA);
    }

    return {
      googleId: payload.sub,
      firstName: payload.given_name ?? '',
      lastName: payload.family_name ?? '',
      email: payload.email,
      avatarLink: payload.picture,
    };
  }

  async createOrUpdateUserAccountFromGoogle(
    userData: UserGoogleDataDto,
    res: Response,
  ) {
    if (!userData) {
      throw new BadRequestException(AUTH_MESSAGES.GOOGLE_USER_DATA_REQUIRED);
    }

    let user = await this.userService.findByGoogleId(userData.googleId, true);

    if (!user) {
      user = await this.userService.findByEmail(userData.email, true);

      if (!user) {
        user = await this.userService.createFromGoogle(userData);
      } else if (!user.credentials?.googleId) {
        await this.userCredentialsService.updateCredentials(user.id, {
          googleId: userData.googleId,
        });
      }
    }

    return this.tokenService.authorize(user, res);
  }

  async loginViaGoogle(idToken: string, res: Response) {
    const userData = await this.getUserDataFromGoogle(idToken);
    return this.createOrUpdateUserAccountFromGoogle(userData, res);
  }
}
