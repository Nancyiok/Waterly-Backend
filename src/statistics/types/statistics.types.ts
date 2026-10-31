export type Interval = { from: Date; to: Date };

export type DailyTotal = { date: string; ml: number };

export type LinePoint = { date: string; ml: number };

export type Bar = { from: string; to: string; ml: number };

export type Charts = { lineChart: LinePoint[]; barChart: Bar[] };

export type Summary = {
  totalMl: number;
  averageMl: number;
  bestDay: LinePoint | null;
  activeDays: number;
  totalDays: number;
};

export type GoalCompletion = {
  percentage: number;
  goalDays: number;
  totalDays: number;
};
