export const WATER_STATS_EXAMPLES = {
  climate: {
    value: 'warm',
    description:
      'Climate: cool under 18°C adds 0 ml, moderate 18 to 24°C adds 200 ml, warm 25 to 30°C adds 450 ml, extreme over 30°C adds 800 ml',
  },
  activity: {
    value: 'moderate',
    description:
      'Physical activity: sedentary adds 0 ml, moderate adds 300 ml, heavy adds 650 ml, athletic adds 1000 ml',
  },
  heavySweating: {
    value: false,
    description: 'Heavy sweating, adds 350 ml',
  },
  caffeine: {
    value: true,
    description: 'Caffeine compensation, adds 250 ml',
  },
  recovery: {
    value: false,
    description: 'Elevated temperature recovery, adds 400 ml',
  },
  waterGoal: {
    value: 3325,
    description: 'Daily water goal in milliliters',
  },
  streakGoal: {
    value: 0,
    description: 'Streak goal in days',
  },
  todayIntakeMl: {
    value: 1250,
    description: 'Water consumed today in milliliters',
  },
  dailyRemainingWater: {
    value: 2075,
    description: 'Water left to drink today in milliliters',
  },
  weeklyAverageMl: {
    value: 2080,
    description: 'Average water per day with drinks over the last 7 days in milliliters',
  },
};
