import { PERMISSIONS_SORTABLE_COLUMNS } from '@/lib/drizzle/schemas';
import { stringToPositiveInt, text } from '@/lib/zod/utils/fields';
import { generateSortField } from '@/lib/zod/utils/generate-sort-field';
import { z } from 'zod';

// Types
export type GetAllPermissions = z.infer<typeof getAllPermissionsSchema>;

// Schemas
export const getAllPermissionsSchema = z
  .strictObject({
    limit: stringToPositiveInt,
    page: stringToPositiveInt,
    sort: generateSortField(PERMISSIONS_SORTABLE_COLUMNS),
    search: text,
  })
  .partial();
