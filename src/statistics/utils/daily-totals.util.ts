import { toDay } from './statistics-chart.util';
import { type DailyTotal, type Interval } from '../types/statistics.types';

export const sumMl = (days: DailyTotal[]) =>
  days.reduce((sum, { ml }) => sum + ml, 0);

export const findBestDay = (days: DailyTotal[]): DailyTotal | null =>
  days.reduce<DailyTotal | null>(
    (best, day) => (!best || day.ml > best.ml ? day : best),
    null,
  );

export const groupByIntervals = (
  intervals: Interval[],
  days: DailyTotal[],
): DailyTotal[][] =>
  intervals.map(({ from, to }) => {
    const start = toDay(from);
    const end = toDay(to);
    return days.filter(({ date }) => date >= start && date <= end);
  });
