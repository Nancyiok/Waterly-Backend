import { AUTH } from './auth.constant';

export const EMAIL = {
  DEFAULT_FROM: 'onboarding@resend.dev',
  ASSETS_DIR: 'assets/email',
  FONTS_URL:
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap',
  IMAGES: {
    LOGO: { file: 'logo.png', cid: 'logo', width: 172, height: 44 },
    BANNER: { file: 'banner.jpg', cid: 'banner', width: 520, height: 180 },
    VERIFY_EMAIL_TITLE: {
      file: 'title-verify-email.png',
      cid: 'title',
      width: 276,
      height: 42,
    },
    RESET_PASSWORD_TITLE: {
      file: 'title-reset-password.png',
      cid: 'title',
      width: 268,
      height: 42,
    },
  },
  COLORS: {
    primary: '#4A9BD1',
    primaryDark: '#25537A',
    primaryFoam: '#E8F4FB',
    background: '#F4F7F9',
    border: '#E8EDF1',
    text: '#7B8794',
    white: '#FFFFFF',
  },
  RADIUS: {
    card: '8px',
    button: '4px',
  },
};

export const EMAIL_TEXTS = {
  VERIFY_EMAIL: {
    subject: 'Verify your email address',
    title: 'Welcome to Waterly!',
    text: 'You are one step away from making hydration a habit. Confirm your email address to start tracking your water.',
    button: 'Verify email',
    note: `The link expires in ${AUTH.VERIFICATION_TOKEN_TTL_HOURS} hours. If you didn't sign up for Waterly, just ignore this email.`,
  },
  RESET_PASSWORD: {
    subject: 'Reset your password',
    title: 'Reset your password',
    text: 'We received a request to reset your password. Click the button below to choose a new one.',
    button: 'Reset password',
    note: `The link expires in ${AUTH.RESET_TOKEN_TTL_HOURS} hour. If you didn't request a password reset, just ignore this email.`,
  },
  FOOTER: 'Stay hydrated, Waterly team',
};
