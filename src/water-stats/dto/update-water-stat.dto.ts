import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { ActivityLevel, Climate } from '@prisma/client';
import { SWAGGER_EXAMPLES } from '../../common/constants/swagger-examples';

export class UpdateWaterStatDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.climate.value,
    description: SWAGGER_EXAMPLES.climate.description,
    enum: Climate,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsEnum(Climate)
  climate?: Climate | null;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.activity.value,
    description: SWAGGER_EXAMPLES.activity.description,
    enum: ActivityLevel,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsEnum(ActivityLevel)
  activity?: ActivityLevel | null;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.heavySweating.value,
    description: SWAGGER_EXAMPLES.heavySweating.description,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  heavySweating?: boolean;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.caffeine.value,
    description: SWAGGER_EXAMPLES.caffeine.description,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  caffeine?: boolean;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.recovery.value,
    description: SWAGGER_EXAMPLES.recovery.description,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  recovery?: boolean;
}
