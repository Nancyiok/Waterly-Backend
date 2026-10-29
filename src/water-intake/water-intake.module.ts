import { Module } from '@nestjs/common';
import { WaterIntakeService } from './water-intake.service';
import { WaterIntakeController } from './water-intake.controller';

@Module({
  controllers: [WaterIntakeController],
  providers: [WaterIntakeService],
})
export class WaterIntakeModule {}
