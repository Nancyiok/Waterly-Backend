import { ApiProperty } from '@nestjs/swagger';
import { SWAGGER_EXAMPLES } from '../../common/constants/swagger-examples';

export class LinePointDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.statisticsDate.value,
    description: SWAGGER_EXAMPLES.statisticsDate.description,
  })
  date: string;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.statisticsDayMl.value,
    description: SWAGGER_EXAMPLES.statisticsDayMl.description,
  })
  ml: number;
}

export class BarDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.barFrom.value,
    description: SWAGGER_EXAMPLES.barFrom.description,
  })
  from: string;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.barTo.value,
    description: SWAGGER_EXAMPLES.barTo.description,
  })
  to: string;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.barMl.value,
    description: SWAGGER_EXAMPLES.barMl.description,
  })
  ml: number;
}

export class SummaryDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.totalMl.value,
    description: SWAGGER_EXAMPLES.totalMl.description,
  })
  totalMl: number;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.averageMl.value,
    description: SWAGGER_EXAMPLES.averageMl.description,
  })
  averageMl: number;

  @ApiProperty({
    type: () => LinePointDto,
    nullable: true,
    description: SWAGGER_EXAMPLES.bestDay.description,
  })
  bestDay: LinePointDto | null;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.activeDays.value,
    description: SWAGGER_EXAMPLES.activeDays.description,
  })
  activeDays: number;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.totalDays.value,
    description: SWAGGER_EXAMPLES.totalDays.description,
  })
  totalDays: number;
}

export class GoalCompletionDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.goalPercentage.value,
    description: SWAGGER_EXAMPLES.goalPercentage.description,
  })
  percentage: number;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.goalDays.value,
    description: SWAGGER_EXAMPLES.goalDays.description,
  })
  goalDays: number;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.totalDays.value,
    description: SWAGGER_EXAMPLES.totalDays.description,
  })
  totalDays: number;
}

export class StatisticsResponseDto {
  @ApiProperty({ type: () => SummaryDto })
  summary: SummaryDto;

  @ApiProperty({
    type: () => LinePointDto,
    isArray: true,
    description: SWAGGER_EXAMPLES.lineChart.description,
  })
  lineChart: LinePointDto[];

  @ApiProperty({
    type: () => BarDto,
    isArray: true,
    description: SWAGGER_EXAMPLES.barChart.description,
  })
  barChart: BarDto[];

  @ApiProperty({
    type: () => GoalCompletionDto,
    nullable: true,
    description: SWAGGER_EXAMPLES.goalCompletion.description,
  })
  goalCompletion: GoalCompletionDto | null;
}
