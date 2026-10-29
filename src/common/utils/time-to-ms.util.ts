type TimeUnit = 'seconds' | 'minutes' | 'hours' | 'days';

const MULTIPLIERS_MS: Record<TimeUnit, number> = {
  seconds: 1000,
  minutes: 60 * 1000,
  hours: 60 * 60 * 1000,
  days: 24 * 60 * 60 * 1000,
};

export function timeToMs(value?: number, unit: TimeUnit = 'days'): number {
  if (!value) return 0;
  return value * MULTIPLIERS_MS[unit];
}
