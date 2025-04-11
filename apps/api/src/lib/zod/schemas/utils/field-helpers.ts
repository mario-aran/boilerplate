import { z } from 'zod';

// Pagination helpers
export const getOrderBy = <T extends string>(values: [T, ...T[]]) =>
  z
    .array(z.string())
    .min(1)
    .transform((arr) =>
      arr.map((item) => {
        const [field, order] = item.split('.') as [T, 'asc' | 'desc'];
        return { field, order };
      }),
    )
    .refine(
      (arr) =>
        arr.every(
          ({ field, order }) =>
            values.includes(field) && (order === 'asc' || order === 'desc'),
        ),
      { message: 'Invalid field or order in orderBy query' },
    );
