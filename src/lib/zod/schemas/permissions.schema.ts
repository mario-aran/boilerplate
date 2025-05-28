import { PERMISSIONS_COLUMNS } from '@/lib/drizzle/schemas';
import { limit, page, search } from '@/lib/zod/utils/fields';
import { createSortField } from '@/lib/zod/utils/helpers';
import { z } from 'zod';

// Types
export type GetAllPermissions = z.infer<typeof getAllPermissionsSchema>;

// Fields
const sort = createSortField(PERMISSIONS_COLUMNS);

// Schemas
export const getAllPermissionsSchema = z
  .strictObject({ sort, limit, page, search })
  .partial();
