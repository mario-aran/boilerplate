import { z } from 'zod';

// Utils
const noSpaces = (field: z.ZodString) =>
  field.refine((val) => /^[^\s]+$/.test(val), {
    message: 'Must not contain spaces',
  });

const lowerAlphanumUnder = (field: z.ZodString) =>
  field.refine((val) => /^[a-z0-9_]+$/.test(val), {
    message: 'Must be lowercase alphanumeric and may include underscores (_)',
  });

const threeDotSeparated = (field: z.ZodString) =>
  field.refine((val) => val.split('.').length === 3, {
    message: 'Must have three dot-separated parts',
  });

// Fields
export const positiveInt = z.number().int().positive();
export const stringToPositiveInt = z
  .string()
  .nonempty()
  .transform(Number)
  .pipe(positiveInt);

export const text = z.string().trim().min(1).max(60);
export const textId = noSpaces(lowerAlphanumUnder(z.string().min(4).max(12)));
export const uuid = z.uuid();
export const jwtToken = noSpaces(threeDotSeparated(z.string().min(1)));
export const email = z.email().min(5).max(60);
export const password = noSpaces(z.string().min(8).max(20));
