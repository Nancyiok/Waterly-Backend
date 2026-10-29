import * as crypto from 'crypto';
import { timeToMs } from './time-to-ms.util';
import { AUTH } from '../constants/auth.constant';


export const generateToken = () =>
  crypto.randomBytes(AUTH.TOKEN_BYTES).toString('hex');

export const getTokenExpiresAt = (hours: number) =>
  new Date(Date.now() + timeToMs(hours, 'hours'));

export const isTokenExpired = (expiresAt: Date | null) =>
  !!expiresAt && expiresAt < new Date();
