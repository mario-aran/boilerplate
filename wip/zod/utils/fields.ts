import { z } from 'zod';

export const positiveInt = z.number().int().positive();
export const paramPositiveInt = z.string().transform(Number).pipe(positiveInt);

export const text = z.string().trim().min(1).max(60);

export const textId = z
  .string()
  .min(3)
  .max(12)
  .refine((value) => /^[a-z0-9_]+$/.test(value), {
    message: 'Must be lowercase alphanumeric and may include underscores (_)',
  })
  .refine((value) => value.trim() === value, {
    message: 'No leading or trailing spaces',
  });

export const uuid = z.string().uuid();

export const dateTime = z
  .string()
  .datetime({ message: 'Invalid datetime, must be UTC' });

export const email = z.string().email().min(5).max(60);

export const password = z
  .string()
  .min(8)
  .max(20)
  .refine((val) => /^[^\s]+$/.test(val), {
    message: 'Must not contain spaces',
  });
