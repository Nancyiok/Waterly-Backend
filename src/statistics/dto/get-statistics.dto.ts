import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import {
  STATISTICS_PERIODS,
  type StatisticsPeriod,
} from '../../common/constants/statistics.constant';
import { SWAGGER_EXAMPLES } from '../../common/constants/swagger-examples';

export class GetStatisticsDto {
  @ApiProperty({
    enum: STATISTICS_PERIODS,
    example: SWAGGER_EXAMPLES.period.value,
    description: SWAGGER_EXAMPLES.period.description,
  })
  @IsIn(STATISTICS_PERIODS)
  period: StatisticsPeriod;
}
