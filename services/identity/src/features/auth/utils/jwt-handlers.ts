import {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_RESET_PASSWORD_SECRET,
  JWT_VERIFICATION_EMAIL_SECRET,
} from '@/config/env';
import { InvalidTokenError } from '@/errors/http-errors';
import { JwtPayload } from '@/features/auth/types';
import jwt from 'jsonwebtoken';

// ---------------------------
// UTILS
// ---------------------------

const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch {
    throw InvalidTokenError;
  }
};

// ---------------------------
// EMAIL VERIFICATION
// ---------------------------

export const signVerificationEmailToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_VERIFICATION_EMAIL_SECRET, { expiresIn: '15m' });

export const verifyVerificationEmailToken = (token: string) =>
  verifyToken(token, JWT_VERIFICATION_EMAIL_SECRET);

// ---------------------------
// ACCESS + REFRESH
// ---------------------------

export const signAccessToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '15m' });

export const signRefreshToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });

export const verifyRefreshToken = (token: string) =>
  verifyToken(token, JWT_REFRESH_SECRET);

// ---------------------------
// RESET PASSWORD
// ---------------------------

export const signResetPasswordToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_RESET_PASSWORD_SECRET, { expiresIn: '15m' });

export const verifyResetPasswordToken = (token: string) =>
  verifyToken(token, JWT_RESET_PASSWORD_SECRET);
