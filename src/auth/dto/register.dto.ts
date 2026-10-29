import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { SWAGGER_EXAMPLES } from '../../common/constants/swagger-examples';

export class RegisterDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.email.value,
    description: SWAGGER_EXAMPLES.email.description,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.password.value,
    description: SWAGGER_EXAMPLES.password.description,
    minLength: SWAGGER_EXAMPLES.password.minLength,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(SWAGGER_EXAMPLES.password.minLength)
  password: string;
}