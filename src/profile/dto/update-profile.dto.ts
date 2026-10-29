import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsUrl,
  Max,
  Min,
  IsOptional,
  IsEnum,
  IsDateString,
  IsPhoneNumber
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '@prisma/client';

import { CreateProfileDto } from './create-profile.dto';

import { SWAGGER_EXAMPLES } from '../../common/constants/swagger-examples';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @ApiProperty({
    example: SWAGGER_EXAMPLES.avatarLink.value,
    description: SWAGGER_EXAMPLES.avatarLink.description,
    required: false,
  })
  @IsOptional()
  @IsUrl()
  avatarLink?: string;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.height.value,
    description: SWAGGER_EXAMPLES.height.description,
    minimum: SWAGGER_EXAMPLES.height.min,
    maximum: SWAGGER_EXAMPLES.height.max,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(SWAGGER_EXAMPLES.height.min)
  @Max(SWAGGER_EXAMPLES.height.max)
  height?: number;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.weight.value,
    description: SWAGGER_EXAMPLES.weight.description,
    minimum: SWAGGER_EXAMPLES.weight.min,
    maximum: SWAGGER_EXAMPLES.weight.max,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(SWAGGER_EXAMPLES.weight.min)
  @Max(SWAGGER_EXAMPLES.weight.max)
  weight?: number;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.gender.value,
    description: SWAGGER_EXAMPLES.gender.description,
    enum: Gender,
    required: false,
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.dateOfBirth.value,
    description: SWAGGER_EXAMPLES.dateOfBirth.description,
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiProperty({
    example: SWAGGER_EXAMPLES.phone.value,
    description: SWAGGER_EXAMPLES.phone.description,
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}
