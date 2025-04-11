import { z } from 'zod';

// Id fields
export const id = z.string().uuid();
export const stringId = z
  .string()
  .min(3)
  .max(12)
  .refine((val) => /^[A-Z0-9]+$/.test(val), {
    message: 'Must be uppercase alphanumeric without spaces',
  });

// Text fields
export const string = z.string().trim().min(1).max(60);

// User fields
export const email = z.string().email().min(5).max(60);

export const password = z
  .string()
  .min(8)
  .max(20)
  .refine((val) => /^[^\s]+$/.test(val), {
    message: 'Must not contain spaces',
  });

// Filter fields
export const limit = z.number().int().positive();
export const skip = z.number().int().positive();
