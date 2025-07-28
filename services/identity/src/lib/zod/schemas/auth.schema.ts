import { email, password, token } from '@/lib/zod/utils/fields';
import { z } from 'zod';

// Types
export type ResendEmailVerification = z.infer<
  typeof resendEmailVerificationSchema
>;

export type VerifyEmail = z.infer<typeof verifyEmailSchema>;
export type Login = z.infer<typeof loginSchema>;

// Schemas
export const resendEmailVerificationSchema = z.strictObject({ email });
export const verifyEmailSchema = z.strictObject({ token });
export const loginSchema = z.strictObject({ email, password });
