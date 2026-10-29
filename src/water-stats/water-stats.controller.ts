import { Controller, Get, Body, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { WaterStatsService } from './water-stats.service';
import { UpdateWaterStatDto } from './dto/update-water-stat.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { WATER_STATS_SUMMARIES } from '../common/constants/swagger-summaries/water-stats.constants';
import { ApiOkResponseData } from '../common/decorators/api-ok-response-data.decorator';
import { WaterStatsResponseDto } from './dto/water-stats-response.dto';

@ApiTags('Water stats')
@ApiBearerAuth()
@Controller('water-stats')
export class WaterStatsController {
  constructor(private readonly waterStatsService: WaterStatsService) {}

  @Get()
  @ApiOperation({ summary: WATER_STATS_SUMMARIES.FIND_ONE })
  @ApiOkResponseData(WaterStatsResponseDto)
  findOne(@CurrentUser() user: User) {
    return this.waterStatsService.findOne(user.id);
  }

  @Patch()
  @ApiOperation({ summary: WATER_STATS_SUMMARIES.UPDATE })
  update(@CurrentUser() user: User, @Body() updateWaterStatDto: UpdateWaterStatDto) {
    return this.waterStatsService.update(user.id, updateWaterStatDto);
  }
}
