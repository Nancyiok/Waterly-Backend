import { Injectable } from '@nestjs/common';
import { WaterTotalsService } from './water-totals.service';
import { calculatePercent } from '../../common/utils/calculate-percent.util';
import { fromDbDay } from '../../common/utils/db-day.util';
import { calculateAverage } from '../../common/utils/calculate-average.util';
import { countDays } from '../utils/statistics-period.util';
import {
  type GoalCompletion,
  type Interval,
  type Summary,
} from '../types/statistics.types';

@Injectable()
export class StatisticsSummaryService {
  constructor(private readonly waterTotals: WaterTotalsService) {}

  async getSummary(
    userId: number,
    period: Interval,
    activeDays: number,
  ): Promise<Summary> {
    const [totalMl, bestDay] = await Promise.all([
      this.waterTotals.getTotal(userId, period),
      this.waterTotals.getBestDay(userId, period),
    ]);

    return {
      totalMl,
      averageMl: calculateAverage(totalMl, activeDays),
      bestDay: bestDay
        ? { date: fromDbDay(bestDay.day), ml: bestDay._sum.ml ?? 0 }
        : null,
      activeDays,
      totalDays: countDays(period),
    };
  }

  async getGoalCompletion(
    userId: number,
    period: Interval,
  ): Promise<GoalCompletion> {
    const waterGoal = await this.waterTotals.getWaterGoal(userId);
    const goalDays =
      waterGoal > 0
        ? await this.waterTotals.countGoalDays(userId, period, waterGoal)
        : 0;
    const totalDays = countDays(period);

    return {
      percentage: calculatePercent(goalDays, totalDays),
      goalDays,
      totalDays,
    };
  }
}
