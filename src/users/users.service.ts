import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import type { User, UserCredentials } from '@prisma/client';
import { type PrismaClient } from '@prisma/client';
import { type Prisma } from '@prisma/client';
import { UserGoogleDataDto } from '../auth/dto/google.login.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async createWithPassword(dto: CreateUserDto) {
    const {
      email,
      passwordHash,
      verificationToken,
      verificationTokenExpiresAt,
    } = dto;
    return this.prisma.user.create({
      data: {
        email,
        credentials: {
          create: {
            passwordHash,
            verificationToken,
            verificationTokenExpiresAt,
          },
        },
      },
    });
  }

  // overloading
  async findByEmail(
    email: string,
    withCredentials: true,
  ): Promise<(User & { credentials: UserCredentials | null }) | null>;

  async findByEmail(
    email: string,
    withCredentials?: false,
  ): Promise<User | null>;
  async findByEmail(email: string, withCredentials = false) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { credentials: withCredentials },
    });
  }

  async findById(
    id: number,
    withCredentials: true,
  ): Promise<(User & { credentials: UserCredentials | null }) | null>;

  async findById(id: number, withCredentials?: false): Promise<User | null>;

  async findById(id: number, withCredentials = false) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { credentials: withCredentials },
    });
  }

  async findByGoogleId(
    googleId: string,
    withCredentials: true,
  ): Promise<(User & { credentials: UserCredentials | null }) | null>;
  async findByGoogleId(
    googleId: string,
    withCredentials?: false,
  ): Promise<User | null>;
  async findByGoogleId(googleId: string, withCredentials = false) {
    return this.prisma.user.findFirst({
      where: { credentials: { googleId } },
      include: { credentials: withCredentials },
    });
  }

  async createFromGoogle(
    userData: UserGoogleDataDto,
    client: Prisma.TransactionClient | PrismaClient = this.prisma,
  ) {
    return client.user.create({
      data: {
        email: userData.email,
        isVerified: true,
        credentials: {
          create: { googleId: userData.googleId },
        },
        profile: {
          create: {
            name: userData.firstName,
            surname: userData.lastName,
            avatarLink: userData.avatarLink,
          },
        },
        waterStats: { create: {} },
      },
      include: { credentials: true },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: { ...dto },
    });
  }

  async verify(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: {
        isVerified: true,
        credentials: {
          update: { verificationToken: null, verificationTokenExpiresAt: null },
        },
        profile: { create: {} },
        waterStats: { create: {} },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }
}
