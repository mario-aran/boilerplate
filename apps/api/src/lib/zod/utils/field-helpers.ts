import { z, ZodTypeAny } from 'zod';

export const createUniqueArraySchema = <T extends ZodTypeAny>(schema: T) =>
  schema.array().refine(
    (values) => {
      const uniqueValues = new Set(values);
      return uniqueValues.size === values.length;
    },
    { message: 'Duplicate fields are not allowed' },
  );

export const createSortSchema = <T extends string>(allowedFields: T[]) => {
  // Transform from "field1,-field2,field3" to array
  const transformed = z
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
    );

  return transformed
    .refine(
      (values) => {
        const fields = values.map(({ field }) => field);
        const uniqueFields = new Set(fields);
        return uniqueFields.size === values.length;
      },
      { message: 'Duplicate fields are not allowed' },
    )
    .refine(
      (values) => values.every(({ field }) => allowedFields.includes(field)),
      { message: 'Invalid sort field(s)' },
    );
};
