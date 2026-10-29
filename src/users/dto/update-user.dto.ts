import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './user-create.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  passwordHash?: string;
  googleId?: string;
  refreshTokenHash?: string | null;
  verificationToken?: string | null;
  verificationTokenExpiresAt?: Date | null;
  isVerified?: boolean;
  resetToken?: string | null;
  resetTokenExpiresAt?: Date | null;
}
