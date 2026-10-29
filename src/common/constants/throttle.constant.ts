const MINUTE_MS = 60000;

export const THROTTLE = {
  DEFAULT: { ttl: MINUTE_MS, limit: 100 },
  LOGIN: { ttl: MINUTE_MS, limit: 5 },
  FORGOT_PASSWORD: { ttl: MINUTE_MS, limit: 3 },
};
