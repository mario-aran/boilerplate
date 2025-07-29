import { PERMISSIONS_SORT_COLUMNS } from '@/lib/drizzle/schemas';
import { stringToPositiveInt, text } from '@/lib/zod/utils/fields';
import { generateSortField } from '@/lib/zod/utils/generate-sort-field';
import { z } from 'zod';

// Types
export type GetAllPermissions = z.infer<typeof getAllPermissionsSchema>;

// Fields
const sort = generateSortField(PERMISSIONS_SORT_COLUMNS);

// Schemas
export const getAllPermissionsSchema = z
  .strictObject({
    limit: stringToPositiveInt,
    page: stringToPositiveInt,
    sort,
    search: text,
  })
  .partial();
