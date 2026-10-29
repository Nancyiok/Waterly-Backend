import { PROFILE_MESSAGES } from '../common/constants/response-messages/profile.constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../prisma/prisma.service';
import { WaterStatsService } from '../water-stats/water-stats.service';


@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly waterStatsService: WaterStatsService,
  ) {}
  async create(userId: number, dto: CreateProfileDto | undefined) {
    return this.prisma.userProfile.create({
      data: {
        userId,
        ...(dto ? dto : {}),
      },
    });
  }

  async findOne(userId: number) {
    const user = await this.prisma.userProfile.findUnique({
      where: { userId },
      omit: { id: true, userId: true },
      include: { user: { select: { email: true } } },
    });
    if (!user) {
      throw new NotFoundException(PROFILE_MESSAGES.NOT_FOUND);
    }

    const { user: owner, ...userdata } = user;
    return {
      ...userdata,
      dateOfBirth: userdata.dateOfBirth,
      email: owner.email,
    };
  }

  async update(userId: number, dto: UpdateProfileDto) {
    const { dateOfBirth, ...rest } = dto;
    const user = await this.prisma.userProfile.update({
      where: { userId },
      data: {
        ...rest,
        ...(dateOfBirth ? { dateOfBirth: new Date(dateOfBirth) } : {}),
      },
      omit: { id: true, userId: true },
      include: { user: { select: { email: true } } },
    });
    if (dto?.weight || dto?.gender) {
      await this.waterStatsService.recalculateGoal(userId);
    }
    const { user: credentialsData, ...userdata } = user;
    return {
      ...userdata,
      dateOfBirth: userdata.dateOfBirth,
      email: credentialsData.email,
    };
  }
}
