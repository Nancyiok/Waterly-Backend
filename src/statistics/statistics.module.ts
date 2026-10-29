import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { WaterTotalsService } from './services/water-totals.service';
import { StatisticsSummaryService } from './services/statistics-summary.service';
import { StatisticsChartsService } from './services/statistics-charts.service';

@Module({
  controllers: [StatisticsController],
  providers: [
    StatisticsService,
    WaterTotalsService,
    StatisticsSummaryService,
    StatisticsChartsService,
  ],
})
export class StatisticsModule {}
