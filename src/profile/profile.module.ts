import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { WaterStatsModule } from '../water-stats/water-stats.module';

@Module({
  imports: [WaterStatsModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
