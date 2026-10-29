import { Module } from '@nestjs/common';
import { WaterStatsService } from './water-stats.service';
import { WaterStatsController } from './water-stats.controller';

@Module({
  controllers: [WaterStatsController],
  providers: [WaterStatsService],
  exports: [WaterStatsService],
})
export class WaterStatsModule {}
