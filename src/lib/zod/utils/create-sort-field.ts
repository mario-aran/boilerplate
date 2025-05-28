import { z } from 'zod';

export const createSortField = <T extends string>(columns: [T, ...T[]]) => {
  const columnsWithOrder = columns.flatMap((col) => [col, `-${col}`]) as [
    T | `-${T}`,
    ...(T | `-${T}`)[],
  ];
  const field = z.enum(columnsWithOrder);

  const fields = field
    .array()
    .min(1)
    .max(100)
    .refine(
      (values) => {
        const colArray = values.map((val) =>
          val.startsWith('-') ? val.slice(1) : val,
        );
        return new Set(colArray).size === colArray.length;
      },
      { message: 'Duplicate fields are forbidden' },
    );

  return z
    .union([field, fields])
    .transform((el) => (Array.isArray(el) ? el : [el]));
};
