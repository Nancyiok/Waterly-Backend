import { ApiProperty } from '@nestjs/swagger';
import { ActivityLevel, Climate } from '@prisma/client';
import { SWAGGER_EXAMPLES } from '../../common/constants/swagger-examples';

export class WaterStatsResponseDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.waterGoal.value,
    description: SWAGGER_EXAMPLES.waterGoal.description,
  })
  waterGoal: number;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.streakGoal.value,
    description: SWAGGER_EXAMPLES.streakGoal.description,
  })
  streakGoal: number;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.todayIntakeMl.value,
    description: SWAGGER_EXAMPLES.todayIntakeMl.description,
  })
  todayIntakeMl: number;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.dailyRemainingWater.value,
    description: SWAGGER_EXAMPLES.dailyRemainingWater.description,
  })
  dailyRemainingWater: number;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.weeklyAverageMl.value,
    description: SWAGGER_EXAMPLES.weeklyAverageMl.description,
  })
  weeklyAverageMl: number;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.climate.value,
    description: SWAGGER_EXAMPLES.climate.description,
    enum: Climate,
    nullable: true,
  })
  climate: Climate | null;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.activity.value,
    description: SWAGGER_EXAMPLES.activity.description,
    enum: ActivityLevel,
    nullable: true,
  })
  activity: ActivityLevel | null;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.heavySweating.value,
    description: SWAGGER_EXAMPLES.heavySweating.description,
  })
  heavySweating: boolean;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.caffeine.value,
    description: SWAGGER_EXAMPLES.caffeine.description,
  })
  caffeine: boolean;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.recovery.value,
    description: SWAGGER_EXAMPLES.recovery.description,
  })
  recovery: boolean;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.updatedAt.value,
    description: SWAGGER_EXAMPLES.updatedAt.description,
  })
  updatedAt: Date;
}
