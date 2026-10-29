import { AUTH_SUMMARIES } from '../../common/constants/swagger-summaries/auth.constants';
import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { GoogleAuthService } from './google.auth.service';
import { Public } from '../../common/decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleAuthDto } from '../dto/google.login.dto';

@ApiTags('Authentication')
@Controller('auth/google')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: AUTH_SUMMARIES.GOOGLE_LOGIN })
  async googleAuth(
    @Body() dto: GoogleAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.googleAuthService.loginViaGoogle(dto.token, res);
  }
}
