import {
  JWT_ACCESS_SECRET,
  JWT_EMAIL_VERIFICATION_SECRET,
  JWT_REFRESH_SECRET,
} from '@/config/env';
import jwt from 'jsonwebtoken';
import { JwtPayload } from './types';

export const signEmailVerificationToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_EMAIL_VERIFICATION_SECRET, { expiresIn: '1d' });

export const signAccessToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '15m' });

export const signRefreshToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });

export const verifyEmailVerificationToken = (token: string) =>
  jwt.verify(token, JWT_EMAIL_VERIFICATION_SECRET) as JwtPayload;
