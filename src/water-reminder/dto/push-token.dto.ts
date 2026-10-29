import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { SWAGGER_EXAMPLES } from '../../common/constants/swagger-examples';
import { PUSH } from '../../common/constants/water-reminder.constant';

export class PushTokenDto {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.pushToken.value,
    description: SWAGGER_EXAMPLES.pushToken.description,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(PUSH.TOKEN_MAX_LENGTH)
  token: string;
}
