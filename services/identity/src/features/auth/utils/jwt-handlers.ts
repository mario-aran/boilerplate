import {
  JWT_ACCESS_SECRET,
  JWT_EMAIL_VERIFICATION_SECRET,
  JWT_REFRESH_SECRET,
} from '@/config/env';
import { JwtPayload } from '@/features/auth/types';
import { HttpError } from '@/utils/http-error';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const signEmailVerificationToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_EMAIL_VERIFICATION_SECRET, { expiresIn: '1d' });

export const signAccessToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '15m' });

export const signRefreshToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });

export const validateEmailVerificationToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_EMAIL_VERIFICATION_SECRET) as JwtPayload;
  } catch {
    throw new HttpError({
      message: 'Invalid token',
      httpStatus: StatusCodes.UNAUTHORIZED,
    });
  }
};
