import { WATER_INTAKE_MESSAGES } from '../common/constants/response-messages/water-intake.constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWaterIntakeDto } from './dto/create-water-intake.dto';
import { UpdateWaterIntakeDto } from './dto/update-water-intake.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { type GetAllIntakesDto } from './dto/get-all-intakes.dto';
import { type GetTodaysIntakesDto } from './dto/get-todays-intakes.dto';
import { startOfDay, addDays } from 'date-fns';
import { toDbDay } from '../common/utils/db-day.util';

@Injectable()
export class WaterIntakeService {
  constructor(private readonly prisma: PrismaService) {}
  create(user: User, createWaterIntakeDto: CreateWaterIntakeDto) {
    return this.prisma.waterIntake.create({
      data: {
        userId: user.id,
        day: toDbDay(new Date()),
        ...createWaterIntakeDto,
      },
      omit: { userId: true, day: true },
    });
  }

  async findAll(userId: number, query: GetAllIntakesDto) {
    const where = { userId, date: { gte: query.from, lt: query.to } };
    const [items, total, sum] = await this.prisma.$transaction([
      this.prisma.waterIntake.findMany({
        where,
        take: query.limit,
        skip: query.offset,
        orderBy: [{ date: query.orderBy }, { id: query.orderBy }],
        omit: { userId: true, day: true },
      }),
      this.prisma.waterIntake.count({ where }),
      this.prisma.waterIntake.aggregate({ where, _sum: { ml: true } }),
    ]);
    return [items, total, { totalMl: sum._sum.ml ?? 0 }];
  }

  async findOne(userId: number, id: number) {
    const intake = await this.prisma.waterIntake.findFirst({
      where: { id, userId },
    });
    if (!intake) {
      throw new NotFoundException(WATER_INTAKE_MESSAGES.NOT_FOUND);
    }
    return intake;
  }

  findTodaysLogs(userId: number, query: GetTodaysIntakesDto) {
    const from = startOfDay(new Date());
    return this.findAll(userId, { ...query, from, to: addDays(from, 1) });
  }

  async update(
    userId: number,
    id: number,
    updateWaterIntakeDto: UpdateWaterIntakeDto,
  ) {
    await this.findOne(userId, id);
    return this.prisma.waterIntake.update({
      where: { id },
      data: updateWaterIntakeDto,
      omit: { userId: true, day: true },
    });
  }

  async remove(userId: number, id: number) {
    await this.findOne(userId, id);
    return this.prisma.waterIntake.delete({
      where: { id },
      omit: { userId: true, day: true },
    });
  }
}
