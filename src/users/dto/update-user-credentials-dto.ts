import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './user-create.dto';

export class UpdateUserCredentialsDto extends PartialType(CreateUserDto) {
  googleId?: string | null;
  passwordHash?: string;
  refreshTokenHash?: string | null;
  verificationToken?: string | null;
  verificationTokenExpiresAt?: Date | null;
  resetToken?: string | null;
  resetTokenExpiresAt?: Date | null;
}