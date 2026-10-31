import { Injectable } from '@nestjs/common';
import { calculatePercent } from '../../common/utils/calculate-percent.util';
import { calculateAverage } from '../../common/utils/calculate-average.util';
import { countDays } from '../utils/statistics-period.util';
import { findBestDay, sumMl } from '../utils/daily-totals.util';
import {
  type DailyTotal,
  type GoalCompletion,
  type Interval,
  type Summary,
} from '../types/statistics.types';

@Injectable()
export class StatisticsSummaryService {
  getSummary(period: Interval, days: DailyTotal[]): Summary {
    const totalMl = sumMl(days);

    return {
      totalMl,
      averageMl: calculateAverage(totalMl, days.length),
      bestDay: findBestDay(days),
      activeDays: days.length,
      totalDays: countDays(period),
    };
  }

  getGoalCompletion(
    period: Interval,
    days: DailyTotal[],
    waterGoal: number,
  ): GoalCompletion {
    const goalDays =
      waterGoal > 0 ? days.filter(({ ml }) => ml >= waterGoal).length : 0;
    const totalDays = countDays(period);

    return {
      percentage: calculatePercent(goalDays, totalDays),
      goalDays,
      totalDays,
    };
  }
}
