import { ApiProperty } from '@nestjs/swagger';
import { SWAGGER_EXAMPLES } from '../../common/constants/swagger-examples';

export class WaterIntakeTotalDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.totalMl.value,
    description: SWAGGER_EXAMPLES.totalMl.description,
  })
  totalMl: number;
}
