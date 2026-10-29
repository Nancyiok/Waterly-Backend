export const WATER_REMINDER_EXAMPLES = {
  reminderEnabled: {
    value: true,
    description: 'Whether water reminders are on',
  },
  timezone: {
    value: 'Europe/Kyiv',
    description:
      'IANA timezone of the user taken from the browser',
  },
  reminderStartTime: {
    value: '09:00',
    description: 'First reminder of the day, HH:mm in the user timezone',
  },
  reminderEndTime: {
    value: '21:00',
    description: 'Last possible reminder of the day, HH:mm in the user timezone',
  },
  reminderInterval: {
    value: 120,
    description: 'Minutes between reminders',
    min: 1,
    max: 720,
  },
  reminderDays: {
    value: [1, 2, 3, 4, 5],
    description: 'Weekdays with reminders, 0 is Sunday',
    min: 0,
    max: 6,
  },
  nextReminderAt: {
    value: '2026-10-29T09:00:00.000Z',
    description: 'Next reminder in UTC, null when reminders are off',
  },
  pushToken: {
    value: 'fMEP0vJ8Rk2...:APA91bH...',
    description: 'Firebase Cloud Messaging token of this browser',
  },
};
