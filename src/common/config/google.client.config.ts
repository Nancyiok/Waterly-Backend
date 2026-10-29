import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';

export const getGoogleClient = (configService: ConfigService) => new OAuth2Client(
  configService.get<string>('GOOGLE_CLIENT_ID'),
  configService.get<string>('GOOGLE_CLIENT_SECRET'),
);
