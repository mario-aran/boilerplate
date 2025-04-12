import { z } from 'zod';

// Ids
export const id = z.string().uuid();

export const textId = z
  .string()
  .min(3)
  .max(12)
  .refine((val) => /^[A-Z0-9]+$/.test(val), {
    message: 'Must be uppercase alphanumeric without spaces',
  });

// Texts
export const text = z.string().trim().nonempty().max(60);
export const email = z.string().email().min(5).max(60);

export const password = z
  .string()
  .min(8)
  .max(20)
  .refine((val) => /^[^\s]+$/.test(val), {
    message: 'Must not contain spaces',
  });

// Filters
export const limit = z.number().int().positive();
export const page = z.number().int().positive();
