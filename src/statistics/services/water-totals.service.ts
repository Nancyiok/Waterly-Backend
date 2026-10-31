import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { fromDbDay, toDbDay } from '../../common/utils/db-day.util';
import { type DailyTotal, type Interval } from '../types/statistics.types';

@Injectable()
export class WaterTotalsService {
  constructor(private readonly prisma: PrismaService) {}

  async getWaterGoal(userId: number) {
    const stats = await this.prisma.waterStats.findUnique({
      where: { userId },
      select: { waterGoal: true },
    });
    return stats?.waterGoal ?? 0;
  }

  async getDailyTotals(
    userId: number,
    { from, to }: Interval,
  ): Promise<DailyTotal[]> {
    const days = await this.prisma.waterIntake.groupBy({
      by: ['day'],
      where: { userId, day: { gte: toDbDay(from), lte: toDbDay(to) } },
      _sum: { ml: true },
      orderBy: { day: 'asc' },
    });
    return days.map(({ day, _sum }) => ({
      date: fromDbDay(day),
      ml: _sum.ml ?? 0,
    }));
  }
}
