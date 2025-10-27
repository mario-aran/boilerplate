import {
  JWT_ACCESS_SECRET,
  JWT_EMAIL_VERIFICATION_SECRET,
  JWT_PASSWORD_RESET_SECRET,
  JWT_REFRESH_SECRET,
} from '@/config/env';
import { InvalidTokenError } from '@/errors/api-errors';
import { JwtPayload } from '@/lib/jwt/types';
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

export const signEmailVerificationToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_EMAIL_VERIFICATION_SECRET, { expiresIn: '15m' });

export const verifyEmailVerificationToken = (token: string) =>
  verifyToken(token, JWT_EMAIL_VERIFICATION_SECRET);

// ---------------------------
// ACCESS
// ---------------------------

export const signAccessToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '15m' });

// ---------------------------
// REFRESH
// ---------------------------

export const signRefreshToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });

export const verifyRefreshToken = (token: string) =>
  verifyToken(token, JWT_REFRESH_SECRET);

// ---------------------------
// PASSWORD RESET
// ---------------------------

export const signPasswordResetToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_PASSWORD_RESET_SECRET, { expiresIn: '15m' });

export const verifyPasswordResetToken = (token: string) =>
  verifyToken(token, JWT_PASSWORD_RESET_SECRET);
