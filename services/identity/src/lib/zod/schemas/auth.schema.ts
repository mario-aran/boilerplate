import { email, password, text, token } from '@/lib/zod/utils/fields';
import { z } from 'zod';

// Types
export type RegisterAuth = z.infer<typeof registerAuthSchema>;

export type ResendEmailVerificationAuth = z.infer<
  typeof resendEmailVerificationAuthSchema
>;

export type VerifyEmailAuth = z.infer<typeof verifyEmailAuthSchema>;
export type LoginAuth = z.infer<typeof loginAuthSchema>;

// Fields
const firstName = text.optional();
const lastName = text.optional();

// Schemas
export const registerAuthSchema = z.strictObject({
  email,
  password,
  firstName,
  lastName,
});

export const resendEmailVerificationAuthSchema = z.strictObject({
  currentEmail: email,
});

export const verifyEmailAuthSchema = z.strictObject({ token });
export const loginAuthSchema = z.strictObject({ email, password });
