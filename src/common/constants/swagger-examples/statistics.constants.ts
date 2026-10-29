import { STATISTICS_PERIOD } from '../statistics.constant';

export const STATISTICS_EXAMPLES = {
  period: {
    value: STATISTICS_PERIOD.WEEK,
    description: 'Statistics period: week, month and year',
  },
  statisticsDate: {
    value: '2026-10-22',
    description: 'Day in yyyy-MM-dd, first day of the month for a year',
  },
  statisticsDayMl: {
    value: 1580,
    description:
      'Water drunk on the day in milliliters, average per day for a year',
  },
  barFrom: {
    value: '2026-10-20',
    description: 'First day of the bar interval in yyyy-MM-dd',
  },
  barTo: {
    value: '2026-10-26',
    description: 'Last day of the bar interval in yyyy-MM-dd',
  },
  barMl: {
    value: 6270,
    description: 'Water drunk during the interval in milliliters',
  },
  totalMl: {
    value: 4610,
    description: 'Water drunk during the period in milliliters',
  },
  averageMl: {
    value: 1153,
    description: 'Average water per day with drinks in milliliters',
  },
  activeDays: {
    value: 4,
    description: 'Days with at least one water intake',
  },
  totalDays: {
    value: 7,
    description: 'Days in the period',
  },
  goalDays: {
    value: 2,
    description: 'Days when the water goal was reached',
  },
  bestDay: {
    description: 'Day with the most water, null if there were no intakes',
  },
  lineChart: {
    description: 'A point per day for a week and a month, a point per month for a year',
  },
  barChart: {
    description: 'Empty for a week, a bar per 7 days for a month, a bar per month for a year',
  },
  goalCompletion: {
    description: 'null for a year',
  },
  goalPercentage: {
    value: 29,
    description: 'Share of days in the period when the water goal was reached',
  },
};
