export const AUTH_MESSAGES = {
  REGISTER_SUCCESS:
    'Registration successful. Please check your email to verify your account.',

  EMAIL_ALREADY_EXISTS: 'Account with this email already exists',

  INVALID_CREDENTIALS: 'Invalid email or password',

  EMAIL_NOT_VERIFIED: 'Please verify your email before logging in',

  EMAIL_VERIFIED_SUCCESS: 'Email verified successfully. You are now logged in.',

  INVALID_VERIFICATION_TOKEN: 'Invalid or expired verification token',
  VERIFICATION_TOKEN_EXPIRED:
    'Verification token has expired. Please request a new one.',

  PASSWORD_RESET_REQUESTED:
    'If an account with that email exists, a reset link has been sent',

  INVALID_RESET_TOKEN: 'Invalid reset token',
  RESET_TOKEN_EXPIRED: 'Reset token expired. Please request a new one',
  SAME_PASSWORD:
    'Please choose a different password. Request a new reset link to try again.',
  PASSWORD_RESET_SUCCESS: 'Password reset successfully. You are now logged in.',

  REFRESH_TOKEN_MISSING: 'Refresh token is missing',
  INVALID_REFRESH_TOKEN: 'Invalid or expired refresh token',

  USER_NOT_FOUND: 'User is not found',

  GOOGLE_TOKEN_REQUIRED: 'Google token is required',
  INVALID_GOOGLE_TOKEN: 'Invalid Google token',
  INCOMPLETE_GOOGLE_DATA: 'Incomplete data received from Google',
  GOOGLE_USER_DATA_REQUIRED: 'User data is required',

  LOGOUT_SUCCESS: 'Logged out successfully',
  LOGIN_SUCCESS: 'Logged in successfully',
} as const;