import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsInt,
  IsTimeZone,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { SWAGGER_EXAMPLES } from '../../common/constants/swagger-examples';
import { WATER_REMINDER } from '../../common/constants/water-reminder.constant';

export class WaterReminderDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.reminderEnabled.value,
    description: SWAGGER_EXAMPLES.reminderEnabled.description,
  })
  @IsBoolean()
  enabled: boolean;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.timezone.value,
    description: SWAGGER_EXAMPLES.timezone.description,
  })
  @IsTimeZone()
  timezone: string;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.reminderStartTime.value,
    description: SWAGGER_EXAMPLES.reminderStartTime.description,
  })
  @Matches(WATER_REMINDER.TIME_PATTERN)
  startTime: string;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.reminderEndTime.value,
    description: SWAGGER_EXAMPLES.reminderEndTime.description,
  })
  @Matches(WATER_REMINDER.TIME_PATTERN)
  endTime: string;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.reminderInterval.value,
    description: SWAGGER_EXAMPLES.reminderInterval.description,
    minimum: SWAGGER_EXAMPLES.reminderInterval.min,
    maximum: SWAGGER_EXAMPLES.reminderInterval.max,
  })
  @Type(() => Number)
  @IsInt()
  @Min(SWAGGER_EXAMPLES.reminderInterval.min)
  @Max(SWAGGER_EXAMPLES.reminderInterval.max)
  intervalMinutes: number;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.reminderDays.value,
    description: SWAGGER_EXAMPLES.reminderDays.description,
    type: [Number],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(SWAGGER_EXAMPLES.reminderDays.min, { each: true })
  @Max(SWAGGER_EXAMPLES.reminderDays.max, { each: true })
  days: number[];
}
