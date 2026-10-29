import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SWAGGER_EXAMPLES } from '../../common/constants/swagger-examples';

export class ResetPasswordDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.token.value,
    description: SWAGGER_EXAMPLES.token.description,
  })
  @IsString()
  @IsNotEmpty()
  token: string;
  @ApiProperty({
    example: SWAGGER_EXAMPLES.password.value,
    description: SWAGGER_EXAMPLES.password.description,
    minLength: SWAGGER_EXAMPLES.password.minLength,
  })
  @IsString()
  @MinLength(SWAGGER_EXAMPLES.password.minLength)
  password: string;
}
