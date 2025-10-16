import {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_VERIFICATION_EMAIL_SECRET,
} from '@/config/env';
import { JwtPayload } from '@/features/auth/types';
import { HttpError } from '@/utils/http-error';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch {
    throw new HttpError({
      status: StatusCodes.UNAUTHORIZED,
      message: 'Invalid token',
    });
  }
};

export const signVerificationEmailToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_VERIFICATION_EMAIL_SECRET, { expiresIn: '1d' });

export const verifyVerificationEmailToken = (token: string) =>
  verifyToken(token, JWT_VERIFICATION_EMAIL_SECRET);

export const signAccessToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '15m' });

export const signRefreshToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });

export const verifyRefreshToken = (token: string) =>
  verifyToken(token, JWT_REFRESH_SECRET);
