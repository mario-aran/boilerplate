import { PERMISSIONS_COLUMNS } from '@/lib/drizzle/schemas';
import { createSortField } from '@/lib/zod/utils/create-sort-field';
import { limit, page, search } from '@/lib/zod/utils/fields';
import { z } from 'zod';

// Types
export type GetAllPermissions = z.infer<typeof getAllPermissionsSchema>;

// Fields
const sort = createSortField(PERMISSIONS_COLUMNS);

// Schemas
export const getAllPermissionsSchema = z
  .strictObject({ sort, limit, page, search })
  .partial();
