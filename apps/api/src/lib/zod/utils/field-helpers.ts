import { z } from 'zod';

// Filters
export const getSort = <T extends string>(allowedFields: readonly T[]) => {
  const base = z.string().nonempty();

  // Transform from "field1,-field2,field3" to array
  const transformed = base.transform((value) =>
    value.split(',').map((el) => {
      const desc = el.startsWith('-');
      return {
        field: (desc ? el.slice(1) : el) as T,
        direction: desc ? ('desc' as const) : ('asc' as const),
      };
    }),
  );

  return transformed
    .refine(
      (values) => {
        const unique = new Set(values.map(({ field }) => field));
        return unique.size === values.length;
      },
      { message: 'Duplicate fields are not allowed' },
    )
    .refine(
      (values) =>
        values.every(({ field }) => {
          return allowedFields.includes(field);
        }),
      { message: 'Invalid sort field(s)' },
    );
};
