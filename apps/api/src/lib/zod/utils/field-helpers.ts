import { z } from 'zod';

// Filters
export const getSort = <T extends string>(allowedFields: readonly T[]) => {
  return z
    .string()
    .nonempty()
    .transform((value) =>
      value.split(',').map((el) => {
        const desc = el.startsWith('-');
        return {
          field: (desc ? el.slice(1) : el) as T,
          direction: desc ? ('desc' as const) : ('asc' as const),
        };
      }),
    )
    .refine(
      (values) =>
        values.every(({ field }) => {
          return allowedFields.includes(field);
        }),
      { message: 'Invalid sort field(s)' },
    )
    .refine(
      (values) => {
        const unique = new Set(values.map(({ field }) => field));
        return unique.size === values.length;
      },
      { message: 'Duplicate fields are not allowed' },
    );
};
