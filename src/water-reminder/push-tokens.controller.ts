import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { WATER_REMINDER_SUMMARIES } from '../common/constants/swagger-summaries/water-reminder.constants';
import { PushService } from './services/push.service';
import { PushTokenDto } from './dto/push-token.dto';

@ApiTags('Water reminder')
@ApiBearerAuth()
@Controller('push-tokens')
export class PushTokensController {
  constructor(private readonly pushService: PushService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: WATER_REMINDER_SUMMARIES.REGISTER_PUSH_TOKEN })
  register(@CurrentUser() user: User, @Body() { token }: PushTokenDto) {
    return this.pushService.registerToken(user.id, token);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: WATER_REMINDER_SUMMARIES.REMOVE_PUSH_TOKEN })
  remove(@CurrentUser() user: User, @Body() { token }: PushTokenDto) {
    return this.pushService.removeToken(user.id, token);
  }
}
