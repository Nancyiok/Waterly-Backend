import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailService } from './email.service';
import { UserModule } from '../users/users.module';
import { TokenService } from './token.service';
import { PasswordService } from './password.service';
import { UserCredentialsService } from '../users/user-credentials.service';
import { GoogleAuthController } from './google/google.auth.controller';
import { GoogleAuthService } from './google/google.auth.service';

import { JwtStrategy } from '../strategies/jwt.strategy';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController, GoogleAuthController],
  providers: [
    AuthService,
    EmailService,
    TokenService,
    PasswordService,
    UserCredentialsService,
    GoogleAuthService,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
