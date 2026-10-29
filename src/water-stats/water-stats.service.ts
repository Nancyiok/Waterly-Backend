import { WATER_STATS_MESSAGES } from '../common/constants/response-messages/water-stats.constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateWaterStatDto } from './dto/update-water-stat.dto';
import { PrismaService } from '../prisma/prisma.service';
import { calculateWaterGoal } from '../common/utils/calculate-water-goal.util';
import { calculatePercent } from '../common/utils/calculate-percent.util';
import { toDbDay } from '../common/utils/db-day.util';
import { calculateAverage } from '../common/utils/calculate-average.util';
import { STATISTICS_PERIOD } from '../common/constants/statistics.constant';
import { getPeriodInterval } from '../statistics/utils/statistics-period.util';

@Injectable()
export class WaterStatsService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(userId: number) {
    const stats = await this.findStats(userId);
    return this.withTodayIntake(userId, stats);
  }

  async update(userId: number, dto: UpdateWaterStatDto) {
    const [stats, profile] = await Promise.all([
      this.findStats(userId),
      this.prisma.userProfile.findUnique({
        where: { userId },
        select: { weight: true, gender: true },
      }),
    ]);

    const updated = await this.prisma.waterStats.update({
      where: { userId },
      data: {
        ...dto,
        waterGoal: calculateWaterGoal(profile, { ...stats, ...dto }),
      },
      omit: { id: true, userId: true },
    });
    return this.withTodayIntake(userId, updated);
  }

  recalculateGoal(userId: number) {
    return this.update(userId, {});
  }

  private async findStats(userId: number) {
    const stats = await this.prisma.waterStats.findUnique({
      where: { userId },
      omit: { id: true, userId: true },
    });
    if (!stats) {
      throw new NotFoundException(WATER_STATS_MESSAGES.NOT_FOUND);
    }
    return stats;
  }

  private async withTodayIntake<T extends { waterGoal: number }>(
    userId: number,
    stats: T,
  ) {
    const [{ _sum }, weeklyAverageMl] = await Promise.all([
      this.prisma.waterIntake.aggregate({
        where: { userId, day: toDbDay(new Date()) },
        _sum: { ml: true },
      }),
      this.getWeeklyAverageMl(userId),
    ]);
    const todayIntakeMl = _sum.ml ?? 0;
    const dailyRemainingWater = Math.max(stats.waterGoal - todayIntakeMl, 0)

    return {
      ...stats,
      todayIntakeMl,
      dailyRemainingWater,
      dailyRemainingWaterPercent: calculatePercent(todayIntakeMl, stats.waterGoal),
      weeklyAverageMl,
    };
  }
  private async getWeeklyAverageMl(userId: number) {
    const { from, to } = getPeriodInterval(STATISTICS_PERIOD.WEEK, new Date());
    const days = await this.prisma.waterIntake.groupBy({
      by: ['day'],
      where: { userId, day: { gte: toDbDay(from), lte: toDbDay(to) } },
      _sum: { ml: true },
    });
    const totalMl = days.reduce((sum, { _sum }) => sum + (_sum.ml ?? 0), 0);
    return calculateAverage(totalMl, days.length);
  }
}
