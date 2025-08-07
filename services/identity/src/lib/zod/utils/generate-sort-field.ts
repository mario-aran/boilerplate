import { z } from 'zod';

export const generateSortField = <T extends [string, ...string[]]>(
  columns: T,
) => {
  const field = z.enum(columns);
  const fields = field
    .array()
    .min(1)
    .max(100)
    .refine(
      (vals) => {
        const colArray = vals.map((val) =>
          val.startsWith('-') ? val.slice(1) : val,
        );
        return new Set(colArray).size === colArray.length;
      },
      { message: 'Must not contain duplicate values' },
    );

  return z.union([field, fields]);
};
