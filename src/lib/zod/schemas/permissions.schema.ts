import { PERMISSIONS_COLUMNS } from '@/lib/drizzle/schemas';
import { limit, page, search } from '@/lib/zod/utils/fields';
import { generateSortField } from '@/lib/zod/utils/generate-sort-field';
import { z } from 'zod';

// Types
export type GetAllPermissions = z.infer<typeof getAllPermissionsSchema>;

// Fields
const sort = generateSortField(PERMISSIONS_COLUMNS);

// Schemas
export const getAllPermissionsSchema = z
  .strictObject({ sort, limit, page, search })
  .partial();
