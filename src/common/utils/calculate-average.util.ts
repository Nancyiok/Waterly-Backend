export const calculateAverage = (total: number, count: number) =>
  count > 0 ? Math.round(total / count) : 0;
