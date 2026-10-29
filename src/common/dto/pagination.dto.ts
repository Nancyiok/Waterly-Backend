import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SWAGGER_EXAMPLES } from '../constants/swagger-examples';

export const PAGINATION_DEFAULTS = {
  LIMIT: 20,
  MIN_LIMIT: 1,
  MAX_LIMIT: 100,
  OFFSET: 0,
};

export class PaginationQueryDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.limit.value,
    description: SWAGGER_EXAMPLES.limit.description,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(PAGINATION_DEFAULTS.MIN_LIMIT)
  @Max(PAGINATION_DEFAULTS.MAX_LIMIT)
  limit: number = PAGINATION_DEFAULTS.LIMIT;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.offset.value,
    description: SWAGGER_EXAMPLES.offset.description,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(PAGINATION_DEFAULTS.OFFSET)
  offset: number = PAGINATION_DEFAULTS.OFFSET;
}
