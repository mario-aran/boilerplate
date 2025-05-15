import { ZodArray, ZodTypeAny } from '@/lib/zod';

export const refineUniqueValues = <T extends ZodTypeAny>(
  arraySchema: ZodArray<T>,
) =>
  arraySchema.refine((values) => new Set(values).size === values.length, {
    message: 'Array cannot contain duplicate values',
  });
