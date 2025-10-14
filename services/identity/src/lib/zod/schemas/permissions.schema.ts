import { PERMISSIONS_SORTABLE_COLUMNS } from '@/lib/drizzle/schemas';
import { limit, page, search } from '@/lib/zod/utils/fields';
import { generateSortField } from '@/lib/zod/utils/generate-sort-field';
import { z } from 'zod';

// ---------------------------
// TYPES
// ---------------------------

export type GetPermissions = z.infer<typeof getPermissionsSchema>;

// ---------------------------
// FIELDS
// ---------------------------

const sort = generateSortField(PERMISSIONS_SORTABLE_COLUMNS);

// ---------------------------
// SCHEMAS
// ---------------------------

export const getPermissionsSchema = z
  .strictObject({ limit, page, sort, search })
  .partial();
