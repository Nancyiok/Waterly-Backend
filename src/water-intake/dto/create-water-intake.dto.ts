import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

import { SWAGGER_EXAMPLES } from '../../common/constants/swagger-examples';

export class CreateWaterIntakeDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.ml.value,
    description: SWAGGER_EXAMPLES.ml.description,
    minimum: SWAGGER_EXAMPLES.ml.min,
    maximum: SWAGGER_EXAMPLES.ml.max,
  })
  @Type(() => Number)
  @IsInt()
  @Min(SWAGGER_EXAMPLES.ml.min)
  @Max(SWAGGER_EXAMPLES.ml.max)
  ml: number;
}
