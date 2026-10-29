export const WATER_REMINDER = {
  TIME_PATTERN: /^([01]\d|2[0-3]):[0-5]\d$/,
  DEFAULT: {
    enabled: false,
    timezone: 'Europe/Kyiv',
    startMinute: 540,
    endMinute: 1260,
    intervalMinutes: 120,
    days: [0, 1, 2, 3, 4, 5, 6],
  },
};

export const PUSH = {
  TITLE: 'Time for some water',
  BODY: 'A glass of water right now will keep you on track with your daily goal',
  ICON: '/icons/icon-192.png',
  BADGE: '/icons/badge-72.png',
  TAG: 'water-reminder',
  TOKEN_MAX_LENGTH: 4096,
  ESCAPED_NEWLINE: /\\n/g,
  DEAD_TOKEN_CODES: [
    'messaging/registration-token-not-registered',
    'messaging/invalid-registration-token',
  ],
};
