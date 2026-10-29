import { SWAGGER_EXAMPLES } from '../../common/constants/swagger-examples';
import {
  IsString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(SWAGGER_EXAMPLES.name.minLength)
  name?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(SWAGGER_EXAMPLES.surname.minLength)
  surname?: string;
}