import { ApiProperty } from '@nestjs/swagger';
import { SWAGGER_EXAMPLES } from '../../common/constants/swagger-examples';

export class WaterIntakeResponseDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.id.value,
    description: SWAGGER_EXAMPLES.id.description,
  })
  id: number;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.intakeDate.value,
    description: SWAGGER_EXAMPLES.intakeDate.description,
  })
  date: Date;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.ml.value,
    description: SWAGGER_EXAMPLES.ml.description,
  })
  ml: number;
}
