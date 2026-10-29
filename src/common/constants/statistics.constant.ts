export const STATISTICS_PERIOD = {
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
} as const;
export type StatisticsPeriod =
  (typeof STATISTICS_PERIOD)[keyof typeof STATISTICS_PERIOD];
export const STATISTICS_PERIODS = Object.values(STATISTICS_PERIOD);

export const STATISTICS = {
  WEEK_DAYS: 7,
  MONTH_DAYS: 30,
  YEAR_MONTHS: 12,
};
