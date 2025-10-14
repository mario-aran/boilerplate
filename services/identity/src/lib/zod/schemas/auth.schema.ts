import {
  email,
  firstName,
  lastName,
  password,
  token,
} from '@/lib/zod/utils/fields';
import { z } from 'zod';

// ---------------------------
// TYPES
// ---------------------------

export type Register = z.infer<typeof registerSchema>;

export type ResendVerificationEmail = z.infer<
  typeof resendVerificationEmailSchema
>;

export type VerifyEmail = z.infer<typeof verifyEmailSchema>;
export type Login = z.infer<typeof loginSchema>;
export type RefreshToken = z.infer<typeof refreshTokenSchema>;

// ---------------------------
// SCHEMAS
// ---------------------------

export const resendVerificationEmailSchema = z.strictObject({ email });
export const verifyEmailSchema = z.strictObject({ token });
export const loginSchema = z.strictObject({ email, password });

export const registerSchema = loginSchema.extend({
  firstName: firstName.optional(),
  lastName: lastName.optional(),
});

export const refreshTokenSchema = z.strictObject({ token });
