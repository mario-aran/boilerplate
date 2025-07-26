import { email, password, text, token } from '@/lib/zod/utils/fields';
import { z } from 'zod';

// Types
export type Register = z.infer<typeof registerSchema>;
export type VerifyEmail = z.infer<typeof verifyEmailSchema>;
export type Login = z.infer<typeof loginSchema>;

// Schemas
export const verifyEmailSchema = z.strictObject({ token });
export const loginSchema = z.strictObject({ email, password });

export const registerSchema = z.strictObject({
  ...loginSchema.shape,
  firstName: text.optional(),
  lastName: text.optional(),
});
