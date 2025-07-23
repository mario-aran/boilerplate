import { z } from 'zod';

export const text = z.string().trim().min(1).max(60);

export const email = z.email().min(5).max(60);

export const password = z
  .string()
  .min(8)
  .max(20)
  .refine((val) => /^[^\s]+$/.test(val), {
    message: 'Must not contain spaces',
  });
