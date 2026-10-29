import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ApiOkResponseData } from '../common/decorators/api-ok-response-data.decorator';
import { WATER_REMINDER_SUMMARIES } from '../common/constants/swagger-summaries/water-reminder.constants';
import { WaterReminderSettingsService } from './services/water-reminder-settings.service';
import { UpdateWaterReminderDto } from './dto/update-water-reminder.dto';
import { WaterReminderResponseDto } from './dto/water-reminder-response.dto';

@ApiTags('Water reminder')
@ApiBearerAuth()
@Controller('water-reminder')
export class WaterReminderController {
  constructor(private readonly settingsService: WaterReminderSettingsService) {}

  @Get()
  @ApiOperation({ summary: WATER_REMINDER_SUMMARIES.FIND_ONE })
  @ApiOkResponseData(WaterReminderResponseDto)
  findOne(@CurrentUser() user: User) {
    return this.settingsService.findOne(user.id);
  }

  @Patch()
  @ApiOperation({ summary: WATER_REMINDER_SUMMARIES.UPDATE })
  @ApiOkResponseData(WaterReminderResponseDto)
  update(@CurrentUser() user: User, @Body() dto: UpdateWaterReminderDto) {
    return this.settingsService.update(user.id, dto);
  }
}
