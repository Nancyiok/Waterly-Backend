import { PartialType } from '@nestjs/swagger';
import { WaterReminderDto } from './water-reminder.dto';

export class UpdateWaterReminderDto extends PartialType(WaterReminderDto) {}
