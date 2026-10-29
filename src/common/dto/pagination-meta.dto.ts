import { ApiProperty } from '@nestjs/swagger';
import { SWAGGER_EXAMPLES } from '../constants/swagger-examples';

export class PaginationMetaDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.total.value,
    description: SWAGGER_EXAMPLES.total.description,
  })
  total: number;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.limit.value,
    description: SWAGGER_EXAMPLES.limit.description,
  })
  limit: number;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.offset.value,
    description: SWAGGER_EXAMPLES.offset.description,
  })
  offset: number;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.hasNext.value,
    description: SWAGGER_EXAMPLES.hasNext.description,
  })
  hasNext: boolean;
}
