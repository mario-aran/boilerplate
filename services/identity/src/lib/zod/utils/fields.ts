import { z } from 'zod';
import { lowerAlphanumUnder, noSpaces } from './refines';

export const positiveInt = z.number().int().positive();
export const stringToPositiveInt = z
  .string()
  .nonempty()
  .transform(Number)
  .pipe(positiveInt);

export const text = z.string().trim().min(1).max(60);
export const textId = noSpaces(lowerAlphanumUnder(z.string().min(4).max(40)));
export const uuid = z.uuid();
export const token = noSpaces(z.string().min(1));
export const email = z.email().min(5).max(60);
export const password = noSpaces(z.string().min(8).max(20));
