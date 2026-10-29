import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { StatisticsService } from './statistics.service';
import { GetStatisticsDto } from './dto/get-statistics.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { STATISTICS_SUMMARIES } from '../common/constants/swagger-summaries/statistics.constants';
import { ApiOkResponseData } from '../common/decorators/api-ok-response-data.decorator';
import { StatisticsResponseDto } from './dto/statistics-response.dto';

@ApiTags('Statistics')
@ApiBearerAuth()
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  @ApiOperation({ summary: STATISTICS_SUMMARIES.FIND })
  @ApiOkResponseData(StatisticsResponseDto)
  find(@CurrentUser() user: User, @Query() query: GetStatisticsDto) {
    return this.statisticsService.find(user.id, query);
  }
}
