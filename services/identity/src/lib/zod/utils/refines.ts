import { z } from 'zod';

export const noSpaces = (field: z.ZodString) =>
  field.refine((val) => /^[^\s]+$/.test(val), {
    message: 'Must not contain spaces',
  });

export const lowerAlphanumUnder = (field: z.ZodString) =>
  field.refine((val) => /^[a-z0-9_]+$/.test(val), {
    message: 'Must be lowercase alphanumeric and may include underscores (_)',
  });

export const noDuplicateValues = (fieldArr: z.ZodArray) =>
  fieldArr.refine((vals) => new Set(vals).size === vals.length, {
    message: 'Array must not contain duplicate values',
  });
