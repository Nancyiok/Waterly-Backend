import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { PasswordService } from './password.service';
import { UserCredentialsService } from '../users/user-credentials.service';
import { UserService } from '../users/users.service';
import { EmailService } from './email.service';
import { type RegisterDto } from './dto/register.dto';
import { type LoginDto } from './dto/login.dto';
import { type Response } from 'express';
import { AUTH } from '../common/constants/auth.constant';
import { AUTH_MESSAGES } from '../common/constants/response-messages/auth.constants';
import {
  generateToken,
  getTokenExpiresAt,
  isTokenExpired,
} from '../common/utils/auth-token.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
    private readonly userCredentialsService: UserCredentialsService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException(AUTH_MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    const verificationToken = generateToken();

    await this.userService.createWithPassword({
      email: registerDto.email,
      passwordHash: await this.passwordService.hash(registerDto.password),
      verificationToken,
      verificationTokenExpiresAt: getTokenExpiresAt(
        AUTH.VERIFICATION_TOKEN_TTL_HOURS,
      ),
    });

    void this.emailService.sendVerificationEmail(
      registerDto.email,
      verificationToken,
    );
  }

  async verifyEmail(token: string, res: Response) {
    const user =
      await this.userCredentialsService.findByVerificationToken(token);
    const credentials = user?.credentials;
    if (!user || !credentials?.verificationToken) {
      throw new BadRequestException(AUTH_MESSAGES.INVALID_VERIFICATION_TOKEN);
    }

    if (isTokenExpired(credentials.verificationTokenExpiresAt)) {
      throw new BadRequestException(AUTH_MESSAGES.VERIFICATION_TOKEN_EXPIRED);
    }

    await this.userService.verify(user.id);

    return this.tokenService.authorize(user, res);
  }

  async login(loginDto: LoginDto, res: Response) {
    const user = await this.userService.findByEmail(loginDto.email, true);
    if (!user) {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    const isPasswordMatch = await this.passwordService.compare(
      loginDto.password,
      user.credentials?.passwordHash,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    if (!user.isVerified) {
      throw new UnauthorizedException(AUTH_MESSAGES.EMAIL_NOT_VERIFIED);
    }

    return this.tokenService.authorize(user, res);
  }
}
