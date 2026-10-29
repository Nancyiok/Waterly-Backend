import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { SWAGGER_EXAMPLES } from '../../common/constants/swagger-examples';

export class GetAllIntakesDto extends PaginationQueryDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.orderBy.value,
    description: SWAGGER_EXAMPLES.orderBy.description,
    enum: Prisma.SortOrder,
    required: false,
  })
  @IsOptional()
  @IsEnum(Prisma.SortOrder)
  orderBy: Prisma.SortOrder = Prisma.SortOrder.desc;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.intakeFrom.value,
    description: SWAGGER_EXAMPLES.intakeFrom.description,
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  from?: Date;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.intakeTo.value,
    description: SWAGGER_EXAMPLES.intakeTo.description,
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  to?: Date;
}
