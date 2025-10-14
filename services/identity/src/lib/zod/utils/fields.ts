import { z } from 'zod';
import { lowerAlphanumUnder, noSpaces } from './refines';

// ---------------------------
// INTEGERS
// ---------------------------

export const stringToPositiveInt = z
  .string()
  .nonempty()
  .transform(Number)
  .pipe(z.number().int().positive());

export const limit = stringToPositiveInt;
export const page = stringToPositiveInt;

// ---------------------------
// TEXTS
// ---------------------------

export const text = z.string().trim().min(1).max(60);
export const search = text;
export const firstName = text;
export const lastName = text;

// ---------------------------
// IDS
// ---------------------------

export const uuid = z.uuid();
export const textId = noSpaces(lowerAlphanumUnder(z.string().min(4).max(40)));
export const roleId = textId;

// ---------------------------
// SPECIFIC
// ---------------------------

export const email = z.email().min(5).max(60);
export const password = noSpaces(z.string().min(8).max(20));
export const token = noSpaces(z.string().min(1));
