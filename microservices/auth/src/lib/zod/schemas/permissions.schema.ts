import { PERMISSIONS_SORT_COLUMNS } from '@/lib/drizzle/schemas';
import { paramPositiveInt, text } from '@/lib/zod/utils/fields';
import { generateSortField } from '@/lib/zod/utils/generate-sort-field';
import { z } from 'zod';

// Types
export type GetAllPermissions = z.infer<typeof getAllPermissionsSchema>;

// Fields
const limit = paramPositiveInt;
const page = paramPositiveInt;
const sort = generateSortField(PERMISSIONS_SORT_COLUMNS);
const search = text;

// Schemas
export const getAllPermissionsSchema = z
  .strictObject({ limit, page, sort, search })
  .partial();
