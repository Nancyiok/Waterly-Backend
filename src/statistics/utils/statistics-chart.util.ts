import { eachDayOfInterval, format } from 'date-fns';
import { DATE_FORMAT } from '../../common/constants/date.constant';
import {
  type Bar,
  type DailyTotal,
  type Interval,
  type LinePoint,
} from '../types/statistics.types';

export const toDay = (date: Date) => format(date, DATE_FORMAT.DAY);

export const toDailyLine = (
  { from, to }: Interval,
  dailyTotals: DailyTotal[],
): LinePoint[] => {
  const mlByDate = new Map(dailyTotals.map(({ date, ml }) => [date, ml]));

  return eachDayOfInterval({ start: from, end: to }).map((day) => {
    const date = toDay(day);
    return { date, ml: mlByDate.get(date) ?? 0 };
  });
};

export const toBars = (intervals: Interval[], totals: number[]): Bar[] =>
  intervals.map((interval, i) => ({
    from: toDay(interval.from),
    to: toDay(interval.to),
    ml: totals[i],
  }));
