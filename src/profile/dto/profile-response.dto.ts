import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import { SWAGGER_EXAMPLES } from '../../common/constants/swagger-examples';

export class ProfileResponseDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.name.value,
    description: SWAGGER_EXAMPLES.name.description,
  })
  name: string;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.surname.value,
    description: SWAGGER_EXAMPLES.surname.description,
  })
  surname: string;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.gender.value,
    description: SWAGGER_EXAMPLES.gender.description,
    enum: Gender,
    nullable: true,
  })
  gender: Gender | null;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.weight.value,
    description: SWAGGER_EXAMPLES.weight.description,
    nullable: true,
  })
  weight: number | null;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.avatarLink.value,
    description: SWAGGER_EXAMPLES.avatarLink.description,
    nullable: true,
  })
  avatarLink: string | null;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.dateOfBirth.value,
    description: SWAGGER_EXAMPLES.dateOfBirth.description,
    nullable: true,
  })
  dateOfBirth: string | null;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.phone.value,
    description: SWAGGER_EXAMPLES.phone.description,
    nullable: true,
  })
  phone: string | null;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.email.value,
    description: SWAGGER_EXAMPLES.email.description,
  })
  email: string;
}
