export const WATER_INTAKE_EXAMPLES = {
  ml: {
    value: 250,
    description: 'Amount of water consumed in milliliters',
    min: 100,
    max: 5000,
  },
  intakeDate: {
    value: '2026-10-27T08:30:00.000Z',
    description: 'Date and time of the intake in ISO 8601',
  },
  intakeFrom: {
    value: '2026-10-24T21:00:00.000Z',
    description: 'Return intakes from this date in ISO 8601',
  },
  intakeTo: {
    value: '2026-10-25T21:00:00.000Z',
    description: 'Return intakes before this date in ISO 8601',
  },
};
