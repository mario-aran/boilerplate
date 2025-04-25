import { email, password, text } from '@/lib/zod/utils/fields';
import { z } from 'zod';

// Fields
const firstName = text;
const lastName = text;

// Schemas
export const registerAuthZod = z.object({
  firstName,
  lastName,
  email,
  password,
});
export const loginAuthZod = z.object({ email, password });

// Exported schema types
export type RegisterAuthZod = z.infer<typeof registerAuthZod>;
export type LoginAuthZod = z.infer<typeof loginAuthZod>;
