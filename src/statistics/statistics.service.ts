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
    const dailyTotals = await this.waterTotals.getDailyTotals(userId, interval);

    const summary = this.summaryService.getSummary(
      userId,
      interval,
      dailyTotals.length,
    );

    if (period === STATISTICS_PERIOD.YEAR) {
      const [summaryResult, charts] = await Promise.all([
        summary,
        this.chartsService.getYearCharts(userId, interval),
      ]);
      return { summary: summaryResult, ...charts, goalCompletion: null };
    }

    const [summaryResult, goalCompletion, charts] = await Promise.all([
      summary,
      this.summaryService.getGoalCompletion(userId, interval),
      period === STATISTICS_PERIOD.MONTH
        ? this.chartsService.getMonthCharts(userId, interval, dailyTotals)
        : this.chartsService.getWeekCharts(interval, dailyTotals),
    ]);

    return { summary: summaryResult, ...charts, goalCompletion };
  }
}
