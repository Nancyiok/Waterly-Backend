import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;
  passwordHash: string;
  verificationToken: string | null;
  verificationTokenExpiresAt: Date | null;
  isVerified?: boolean;
}
