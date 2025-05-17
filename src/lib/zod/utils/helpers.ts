import { ZodArray, ZodTypeAny } from '@/lib/zod';

export const getSortColumns = <T extends string>(ascColumns: T[]) =>
  ascColumns.flatMap((column) => [column, `-${column}`]) as [T | `-${T}`];

export const refineUniqueValues = <T extends ZodTypeAny>(
  arraySchema: ZodArray<T>,
) =>
  arraySchema.refine((values) => new Set(values).size === values.length, {
    message: 'Array cannot contain duplicate values',
  });
