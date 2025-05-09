import { z } from '@/lib/zod';

export const idField = z.string().uuid();
export const textField = z.string().trim().nonempty().max(60);
export const emailField = z.string().email().min(5).max(60);
export const limitField = z.number().int().positive();
export const pageField = z.number().int().positive();

export const textIdField = z
  .string()
  .min(3)
  .max(12)
  .refine((val) => /^[A-Z0-9]+$/.test(val), {
    message: 'Must be uppercase alphanumeric without spaces',
  });

export const passwordField = z
  .string()
  .min(8)
  .max(20)
  .refine((val) => /^[^\s]+$/.test(val), {
    message: 'Must not contain spaces',
  });
