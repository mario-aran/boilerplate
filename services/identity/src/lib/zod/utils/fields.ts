import { z } from 'zod';

export const positiveInt = z.number().int().positive();
export const stringToPositiveInt = z
  .string()
  .nonempty()
  .transform(Number)
  .pipe(positiveInt);

export const text = z.string().trim().min(1).max(60);

export const textId = z
  .string()
  .min(4)
  .max(12)
  .refine((value) => /^[a-z0-9_]+$/.test(value), {
    message: 'Must be lowercase alphanumeric and may include underscores (_)',
  })
  .refine((value) => value.trim() === value, {
    message: 'No leading or trailing spaces',
  });

export const uuid = z.uuid();
export const email = z.email().min(5).max(60);

export const password = z
  .string()
  .min(8)
  .max(20)
  .refine((val) => /^[^\s]+$/.test(val), {
    message: 'Must not contain spaces',
  });
