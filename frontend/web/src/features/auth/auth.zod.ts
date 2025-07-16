import { z } from 'zod';

// Field validations
const email = z.string().email().min(4).max(50);
const username = z.string().min(4).max(50);
const password = z.string().min(8).max(16);

// Schemas
export const registerZod = z.object({ email, username, password });
export const loginZod = z.object({ username, password });

// Schema types
export type RegisterZod = z.infer<typeof registerZod>;
export type LoginZod = z.infer<typeof loginZod>;
