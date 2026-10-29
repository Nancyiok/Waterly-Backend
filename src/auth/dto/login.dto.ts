import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { SWAGGER_EXAMPLES } from '../../common/constants/swagger-examples';

export class LoginDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.email.value,
    description: SWAGGER_EXAMPLES.email.description,
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.password.value,
    description: SWAGGER_EXAMPLES.password.description,
    minLength: SWAGGER_EXAMPLES.password.minLength,
    required: true,
  })
  @IsString()
  @MinLength(SWAGGER_EXAMPLES.password.minLength)
  @IsNotEmpty()
  password: string;
}