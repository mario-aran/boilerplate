import { z } from 'zod';

// Pagination helpers
export const getOrderBy = (values: [string, ...string[]]) =>
  z
    .array(z.object({ field: z.enum(values), order: z.enum(['asc', 'desc']) }))
    .min(1);
