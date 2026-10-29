import { SWAGGER_EXAMPLES } from '../../common/constants/swagger-examples';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class GoogleAuthDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.googleToken.value,
    description: SWAGGER_EXAMPLES.googleToken.description,
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class UserGoogleDataDto {
  googleId: string
  firstName: string
  lastName: string
  email: string
  avatarLink?: string
};
