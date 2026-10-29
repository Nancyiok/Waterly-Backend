import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { toDbDay } from '../../common/utils/db-day.util';
import { type Interval } from '../types/statistics.types';

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

  getDailyTotals(userId: number, interval: Interval) {
    return this.prisma.waterIntake.groupBy({
      by: ['day'],
      where: this.whereInterval(userId, interval),
      _sum: { ml: true },
      orderBy: { day: 'asc' },
    });
  }

  async getTotal(userId: number, interval: Interval) {
    const total = await this.prisma.waterIntake.aggregate({
      where: this.whereInterval(userId, interval),
      _sum: { ml: true },
    });
    return total._sum.ml ?? 0;
  }

  async getBestDay(userId: number, interval: Interval) {
    const [bestDay] = await this.prisma.waterIntake.groupBy({
      by: ['day'],
      where: this.whereInterval(userId, interval),
      _sum: { ml: true },
      orderBy: [{ _sum: { ml: 'desc' } }, { day: 'asc' }],
      take: 1,
    });
    return bestDay ?? null;
  }

  async countGoalDays(userId: number, interval: Interval, waterGoal: number) {
    const days = await this.prisma.waterIntake.groupBy({
      by: ['day'],
      where: this.whereInterval(userId, interval),
      having: { ml: { _sum: { gte: waterGoal } } },
    });
    return days.length;
  }

  async getTotals(userId: number, intervals: Interval[]) {
    const totals = await this.prisma.$transaction(
      intervals.map((interval) =>
        this.prisma.waterIntake.aggregate({
          where: this.whereInterval(userId, interval),
          _sum: { ml: true },
        }),
      ),
    );
    return totals.map((total) => total._sum.ml ?? 0);
  }

  async countActiveDays(userId: number, intervals: Interval[]) {
    const days = await this.prisma.$transaction(
      intervals.map((interval) =>
        this.prisma.waterIntake.groupBy({
          by: ['day'],
          where: this.whereInterval(userId, interval),
        }),
      ),
    );
    return days.map((intervalDays) => intervalDays.length);
  }

  private whereInterval(userId: number, { from, to }: Interval) {
    return { userId, day: { gte: toDbDay(from), lte: toDbDay(to) } };
  }
}
