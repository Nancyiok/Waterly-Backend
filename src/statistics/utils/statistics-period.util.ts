import {
  addDays,
  addMonths,
  differenceInCalendarDays,
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

export const splitIntoWeeks = ({ from, to }: Interval): Interval[] => {
  const weeks: Interval[] = [];
  for (
    let start = from;
    start <= to;
    start = addDays(start, STATISTICS.WEEK_DAYS)
  ) {
    weeks.push({
      from: start,
      to: min([addDays(start, STATISTICS.WEEK_DAYS - 1), to]),
    });
  }
  return weeks;
};

export const splitIntoMonths = ({ from, to }: Interval): Interval[] => {
  const months: Interval[] = [];
  for (let start = from; start <= to; start = addMonths(start, 1)) {
    months.push({
      from: start,
      to: min([subDays(addMonths(start, 1), 1), to]),
    });
  }
  return months;
};
