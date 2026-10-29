import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { SWAGGER_EXAMPLES } from '../../common/constants/swagger-examples';

export class UserResponseDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.id.value,
    description: SWAGGER_EXAMPLES.id.description,
  })
  id: number;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.email.value,
    description: SWAGGER_EXAMPLES.email.description,
  })
  email: string;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.role.value,
    description: SWAGGER_EXAMPLES.role.description,
    enum: UserRole,
  })
  role: UserRole;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.isVerified.value,
    description: SWAGGER_EXAMPLES.isVerified.description,
  })
  isVerified: boolean;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.createdAt.value,
    description: SWAGGER_EXAMPLES.createdAt.description,
  })
  createdAt: Date;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.updatedAt.value,
    description: SWAGGER_EXAMPLES.updatedAt.description,
  })
  updatedAt: Date;
}
