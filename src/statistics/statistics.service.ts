import { Injectable } from '@nestjs/common';
import { startOfDay } from 'date-fns';
import { type GetStatisticsDto } from './dto/get-statistics.dto';
import { WaterTotalsService } from './services/water-totals.service';
import { StatisticsSummaryService } from './services/statistics-summary.service';
import { StatisticsChartsService } from './services/statistics-charts.service';
import { getPeriodInterval } from './utils/statistics-period.util';
import { STATISTICS_PERIOD } from '../common/constants/statistics.constant';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly waterTotals: WaterTotalsService,
    private readonly summaryService: StatisticsSummaryService,
    private readonly chartsService: StatisticsChartsService,
  ) {}

  async find(userId: number, { period }: GetStatisticsDto) {
    const interval = getPeriodInterval(period, startOfDay(new Date()));
    const days = await this.waterTotals.getDailyTotals(userId, interval);
    const summary = this.summaryService.getSummary(interval, days);

    if (period === STATISTICS_PERIOD.YEAR) {
      const charts = this.chartsService.getYearCharts(interval, days);
      return { summary, ...charts, goalCompletion: null };
    }

    const waterGoal = await this.waterTotals.getWaterGoal(userId);
    const charts =
      period === STATISTICS_PERIOD.MONTH
        ? this.chartsService.getMonthCharts(interval, days)
        : this.chartsService.getWeekCharts(interval, days);

    return {
      summary,
      ...charts,
      goalCompletion: this.summaryService.getGoalCompletion(
        interval,
        days,
        waterGoal,
      ),
    };
  }
}
