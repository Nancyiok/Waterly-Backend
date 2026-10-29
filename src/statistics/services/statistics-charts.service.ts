import { Injectable } from '@nestjs/common';
import { WaterTotalsService } from './water-totals.service';
import { calculateAverage } from '../../common/utils/calculate-average.util';
import {
  splitIntoMonths,
  splitIntoWeeks,
} from '../utils/statistics-period.util';
import { toBars, toDailyLine, toDay } from '../utils/statistics-chart.util';
import {
  type Charts,
  type DailyTotal,
  type Interval,
} from '../types/statistics.types';

@Injectable()
export class StatisticsChartsService {
  constructor(private readonly waterTotals: WaterTotalsService) {}

  getWeekCharts(period: Interval, dailyTotals: DailyTotal[]): Charts {
    return {
      lineChart: toDailyLine(period, dailyTotals),
      barChart: [],
    };
  }

  async getMonthCharts(
    userId: number,
    period: Interval,
    dailyTotals: DailyTotal[],
  ): Promise<Charts> {
    const weeks = splitIntoWeeks(period);
    const totals = await this.waterTotals.getTotals(userId, weeks);

    return {
      lineChart: toDailyLine(period, dailyTotals),
      barChart: toBars(weeks, totals),
    };
  }

  async getYearCharts(userId: number, period: Interval): Promise<Charts> {
    const months = splitIntoMonths(period);
    const [totals, activeDays] = await Promise.all([
      this.waterTotals.getTotals(userId, months),
      this.waterTotals.countActiveDays(userId, months),
    ]);

    return {
      lineChart: months.map((month, i) => ({
        date: toDay(month.from),
        ml: calculateAverage(totals[i], activeDays[i]),
      })),
      barChart: toBars(months, totals),
    };
  }
}
