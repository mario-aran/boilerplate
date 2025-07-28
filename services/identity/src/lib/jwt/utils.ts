import {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_VERIFY_EMAIL_SECRET,
} from '@/config/env';
import jwt from 'jsonwebtoken';
import { JwtPayload } from './types';

export const signVerifyEmailToken = (userId: string) =>
  jwt.sign({ userId }, JWT_VERIFY_EMAIL_SECRET, {
    expiresIn: '1d',
  });

export const signAccessToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '15m' });

export const signRefreshToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });

export const verifyEmailToken = (token: string) =>
  jwt.verify(token, JWT_VERIFY_EMAIL_SECRET) as JwtPayload;
