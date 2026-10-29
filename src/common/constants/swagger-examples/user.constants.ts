export const USER_EXAMPLES = {
  email: {
    value: 'john@example.com',
    description: 'User email address',
  },
  password: {
    value: 'qwerty123',
    description: 'User password',
    minLength: 8,
  },
  name: {
    value: 'John',
    description: 'User first name',
    minLength: 2,
  },
  surname: {
    value: 'Doe',
    description: 'User last name',
    minLength: 2,
  },
  role: {
    value: 'user',
    description: 'User role',
  },
  isVerified: {
    value: true,
    description: 'Whether the user email is verified',
  },
};
