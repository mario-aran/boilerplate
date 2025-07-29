import { email, password, text, token } from '@/lib/zod/utils/fields';
import { z } from 'zod';

// Types
export type Register = z.infer<typeof registerSchema>;

export type ResendEmailVerification = z.infer<
  typeof resendEmailVerificationSchema
>;

export type VerifyEmail = z.infer<typeof verifyEmailSchema>;
export type Login = z.infer<typeof loginSchema>;

// Fields
const firstName = text.optional();
const lastName = text.optional();

// Schemas
export const registerSchema = z.strictObject({
  email,
  password,
  firstName,
  lastName,
});

export const resendEmailVerificationSchema = z.strictObject({ email });
export const verifyEmailSchema = z.strictObject({ token });
export const loginSchema = z.strictObject({ email, password });
