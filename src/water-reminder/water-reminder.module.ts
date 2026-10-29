import { Module } from '@nestjs/common';
import { WaterReminderController } from './water-reminder.controller';
import { PushTokensController } from './push-tokens.controller';
import { WaterReminderSettingsService } from './services/water-reminder-settings.service';
import { PushService } from './services/push.service';
import { WaterReminderScheduler } from './water-reminder.scheduler';

@Module({
  controllers: [WaterReminderController, PushTokensController],
  providers: [WaterReminderSettingsService, PushService, WaterReminderScheduler],
})
export class WaterReminderModule {}
