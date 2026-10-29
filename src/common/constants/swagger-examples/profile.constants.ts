export const PROFILE_EXAMPLES = {
  avatarLink: {
    value: 'https://example.com/avatar.jpg',
    description: 'URL of the user avatar',
  },
  height: {
    value: 175,
    description: 'User height in centimeters',
    min: 40,
    max: 250,
  },
  weight: {
    value: 75,
    description: 'User weight in kilograms',
    min: 1,
    max: 500,
  },
  gender: {
    value: 'male',
    description: 'User gender',
  },
  dateOfBirth: {
    value: '1998-05-17',
    description: 'User date of birth in ISO 8601',
  },
  phone: {
    value: '+380501234567',
    description: 'User phone number in international format',
  },
};
