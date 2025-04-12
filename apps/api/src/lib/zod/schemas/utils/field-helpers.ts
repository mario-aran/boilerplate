import { z } from 'zod';

// Filters
export const getSort = <T extends string>(allowedFields: readonly T[]) => {
  return z
    .string()
    .refine(
      (value) =>
        value.split(',').every((el) => {
          const field = (el.startsWith('-') ? el.slice(1) : el) as T;
          return allowedFields.includes(field);
        }),
      { message: 'Invalid sort field(s)' },
    )
    .transform((value) =>
      value
        .split(',')
        .filter(Boolean)
        .map((el) => {
          const desc = el.startsWith('-');
          return {
            field: (desc ? el.slice(1) : el) as T,
            direction: desc ? ('desc' as const) : ('asc' as const),
          };
        }),
    );
};
