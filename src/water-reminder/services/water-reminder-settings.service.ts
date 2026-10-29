import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { type UpdateWaterReminderDto } from '../dto/update-water-reminder.dto';
import { WATER_REMINDER } from '../../common/constants/water-reminder.constant';
import { WATER_REMINDER_MESSAGES } from '../../common/constants/response-messages/water-reminder.constants';
import {
  getNextReminderAt,
  toMinutes,
  toTime,
  type ReminderSchedule,
} from '../utils/reminder-time.util';

type ReminderSettings = ReminderSchedule & {
  enabled: boolean;
  nextReminderAt: Date | null;
};

const SETTINGS_OMIT = {
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class WaterReminderSettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(userId: number) {
    return this.toResponse(await this.findSettings(userId));
  }

  async update(
    userId: number,
    { startTime, endTime, ...dto }: UpdateWaterReminderDto,
  ) {
    const { nextReminderAt, ...current } = await this.findSettings(userId);
    const settings = {
      ...current,
      ...dto,
      ...(startTime && { startMinute: toMinutes(startTime) }),
      ...(endTime && { endMinute: toMinutes(endTime) }),
    };
    if (settings.startMinute >= settings.endMinute) {
      throw new BadRequestException(WATER_REMINDER_MESSAGES.INVALID_TIME_RANGE);
    }

    const data = {
      ...settings,
      nextReminderAt: settings.enabled
        ? getNextReminderAt(new Date(), settings)
        : null,
    };
    const saved = await this.prisma.waterReminderSettings.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
      omit: SETTINGS_OMIT,
    });
    return this.toResponse(saved);
  }

  private async findSettings(userId: number): Promise<ReminderSettings> {
    const settings = await this.prisma.waterReminderSettings.findUnique({
      where: { userId },
      omit: SETTINGS_OMIT,
    });
    return settings ?? { ...WATER_REMINDER.DEFAULT, nextReminderAt: null };
  }

  private toResponse({ startMinute, endMinute, ...settings }: ReminderSettings) {
    return {
      ...settings,
      startTime: toTime(startMinute),
      endTime: toTime(endMinute),
    };
  }
}
