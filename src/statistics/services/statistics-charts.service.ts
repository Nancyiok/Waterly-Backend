import { Injectable } from '@nestjs/common';
import { calculateAverage } from '../../common/utils/calculate-average.util';
import {
  splitIntoMonths,
  splitIntoWeeks,
} from '../utils/statistics-period.util';
import { toBars, toDailyLine, toDay } from '../utils/statistics-chart.util';
import { groupByIntervals, sumMl } from '../utils/daily-totals.util';
import {
  type Charts,
  type DailyTotal,
  type Interval,
} from '../types/statistics.types';

@Injectable()
export class StatisticsChartsService {
  getWeekCharts(period: Interval, days: DailyTotal[]): Charts {
    return {
      lineChart: toDailyLine(period, days),
      barChart: [],
    };
  }

  getMonthCharts(period: Interval, days: DailyTotal[]): Charts {
    const weeks = splitIntoWeeks(period);
    const totals = groupByIntervals(weeks, days).map(sumMl);

    return {
      lineChart: toDailyLine(period, days),
      barChart: toBars(weeks, totals),
    };
  }

  getYearCharts(period: Interval, days: DailyTotal[]): Charts {
    const months = splitIntoMonths(period);
    const monthDays = groupByIntervals(months, days);
    const totals = monthDays.map(sumMl);

    return {
      lineChart: months.map((month, i) => ({
        date: toDay(month.from),
        ml: calculateAverage(totals[i], monthDays[i].length),
      })),
      barChart: toBars(months, totals),
    };
  }
}
