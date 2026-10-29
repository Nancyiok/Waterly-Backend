import { TZDate } from '@date-fns/tz';
import { addDays, format, parse, setMinutes, startOfDay } from 'date-fns';
import { daysInWeek, minutesInHour } from 'date-fns/constants';
import { DATE_FORMAT } from '../../common/constants/date.constant';

export type ReminderSchedule = {
  timezone: string;
  startMinute: number;
  endMinute: number;
  intervalMinutes: number;
  days: number[];
};

const getMinuteOfDay = (date: Date) =>
  date.getHours() * minutesInHour + date.getMinutes();

export const toMinutes = (time: string) =>
  getMinuteOfDay(parse(time, DATE_FORMAT.TIME, new Date()));

export const toTime = (minutes: number) =>
  format(setMinutes(startOfDay(new Date()), minutes), DATE_FORMAT.TIME);

export const getNextReminderAt = (
  now: Date,
  { timezone, startMinute, endMinute, intervalMinutes, days }: ReminderSchedule,
) => {
  const userNow = new TZDate(now, timezone);
  const minutesSinceStart = getMinuteOfDay(userNow) - startMinute;
  const nextSlotToday = Math.max(
    startMinute,
    startMinute +
      (Math.floor(minutesSinceStart / intervalMinutes) + 1) * intervalMinutes,
  );

  for (let dayOffset = 0; dayOffset <= daysInWeek; dayOffset++) {
    const reminderDay = addDays(startOfDay(userNow), dayOffset);
    const slotMinute = dayOffset === 0 ? nextSlotToday : startMinute;
    if (days.includes(reminderDay.getDay()) && slotMinute <= endMinute) {
      return new Date(setMinutes(reminderDay, slotMinute).getTime());
    }
  }
  return null;
};
