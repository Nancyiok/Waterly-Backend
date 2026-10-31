import {
  addDays,
  differenceInCalendarDays,
  eachDayOfInterval,
  eachMonthOfInterval,
  endOfMonth,
  min,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns';
import {
  STATISTICS,
  STATISTICS_PERIOD,
  type StatisticsPeriod,
} from '../../common/constants/statistics.constant';
import { type Interval } from '../types/statistics.types';

export const getPeriodInterval = (
  period: StatisticsPeriod,
  today: Date,
): Interval => {
  if (period === STATISTICS_PERIOD.WEEK) {
    return { from: subDays(today, STATISTICS.WEEK_DAYS - 1), to: today };
  }
  if (period === STATISTICS_PERIOD.MONTH) {
    return { from: subDays(today, STATISTICS.MONTH_DAYS - 1), to: today };
  }
  return {
    from: startOfMonth(subMonths(today, STATISTICS.YEAR_MONTHS - 1)),
    to: today,
  };
};

export const countDays = ({ from, to }: Interval) =>
  differenceInCalendarDays(to, from) + 1;

export const splitIntoWeeks = ({ from, to }: Interval): Interval[] =>
  eachDayOfInterval(
    { start: from, end: to },
    { step: STATISTICS.WEEK_DAYS },
  ).map((start) => ({
    from: start,
    to: min([addDays(start, STATISTICS.WEEK_DAYS - 1), to]),
  }));

export const splitIntoMonths = ({ from, to }: Interval): Interval[] =>
  eachMonthOfInterval({ start: from, end: to }).map((start) => ({
    from: start,
    to: min([endOfMonth(start), to]),
  }));
