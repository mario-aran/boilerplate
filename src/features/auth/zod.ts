import { z } from 'zod';

// Field validations
const email = z.string().email().min(4).max(50);
const username = z.string().min(4).max(50);
const password = z.string().min(8).max(16);

// Schemas
export const registerSchema = z.object({ email, username, password });
export const loginSchema = z.object({ username, password });

// Schema types
export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
