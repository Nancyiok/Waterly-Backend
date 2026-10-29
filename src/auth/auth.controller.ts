import { THROTTLE } from '../common/constants/throttle.constant';
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  HttpStatus,
  HttpCode,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiCookieAuth,
} from '@nestjs/swagger';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { PasswordService } from './password.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ForgotPasswordDto } from '../users/dto/forgot-password.dto';
import { ResetPasswordDto } from '../users/dto/reset-password.dto';
import { Throttle } from '@nestjs/throttler';
import { ResponseMessage } from '../common/decorators/response_message.decorator';
import { AUTH_MESSAGES } from '../common/constants/response-messages/auth.constants';
import { AUTH_SUMMARIES } from '../common/constants/swagger-summaries/auth.constants';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
  ) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: AUTH_SUMMARIES.REGISTER })
  @ResponseMessage(AUTH_MESSAGES.REGISTER_SUCCESS)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto).catch((error) => {
      console.error('Error in AuthController.register:', error.message);
      console.error(error.stack);
      throw error;
    });
  }

  @Public()
  @Get('verify-email')
  @ApiOperation({ summary: AUTH_SUMMARIES.VERIFY_EMAIL })
  @ResponseMessage(AUTH_MESSAGES.EMAIL_VERIFIED_SUCCESS)
  async verifyEmail(
    @Query('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.verifyEmail(token, res);
  }

  @Throttle({ default: THROTTLE.LOGIN })
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: AUTH_SUMMARIES.LOGIN })
  @ResponseMessage(AUTH_MESSAGES.LOGIN_SUCCESS)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(loginDto, res);
  }

  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth()
  @ApiOperation({ summary: AUTH_SUMMARIES.REFRESH })
  async refresh(
    @CurrentUser() user: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.tokenService.refresh(user.refreshToken, res);
  }

  @Delete('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: AUTH_SUMMARIES.LOGOUT })
  @ResponseMessage(AUTH_MESSAGES.LOGOUT_SUCCESS)
  async logout(
    @CurrentUser() user: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.tokenService.revoke(user.id, res);
  }

  @Throttle({ default: THROTTLE.FORGOT_PASSWORD })
  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: AUTH_SUMMARIES.FORGOT_PASSWORD })
  @ResponseMessage(AUTH_MESSAGES.PASSWORD_RESET_REQUESTED)
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.passwordService.forgotPassword(dto.email);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: AUTH_SUMMARIES.RESET_PASSWORD })
  @ResponseMessage(AUTH_MESSAGES.PASSWORD_RESET_SUCCESS)
  async resetPassword(
    @Body() dto: ResetPasswordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.passwordService.resetPassword(dto.token, dto.password, res);
  }
}
