import {
  currentEmail,
  email,
  firstName,
  lastName,
  newPassword,
  password,
  token,
} from '@/lib/zod/utils/fields';
import { z } from 'zod';

// ---------------------------
// TYPES
// ---------------------------

export type Register = z.infer<typeof registerSchema>;
export type VerifyEmail = z.infer<typeof verifyEmailSchema>;

export type ResendEmailVerification = z.infer<
  typeof resendEmailVerificationSchema
>;

export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;
export type ResetPassword = z.infer<typeof resetPasswordSchema>;
export type Login = z.infer<typeof loginSchema>;
export type RefreshToken = z.infer<typeof refreshTokenSchema>;

// ---------------------------
// SCHEMAS
// ---------------------------

export const registerSchema = z.strictObject({
  email,
  password,
  firstName: firstName.optional(),
  lastName: lastName.optional(),
});

export const verifyEmailSchema = z.strictObject({ token });
export const resendEmailVerificationSchema = z.strictObject({ currentEmail });
export const forgotPasswordSchema = z.strictObject({ email });
export const resetPasswordSchema = z.strictObject({ token, newPassword });
export const loginSchema = z.strictObject({ email, password });
export const refreshTokenSchema = z.strictObject({ token });
