import { PERMISSIONS_COLUMNS } from '@/lib/drizzle/schemas';
import { z } from '@/lib/zod';
import {
  createdAt,
  limit,
  page,
  search,
  textId,
  updatedAt,
} from '@/lib/zod/utils/fields';
import { createSortField } from '@/lib/zod/utils/helpers';

// Types
export type GetAllPermissions = z.infer<typeof getAllPermissionsSchema>;

// Fields
const sort = createSortField(PERMISSIONS_COLUMNS);
const id = textId;

// Schemas
export const getAllPermissionsSchema = z
  .strictObject({ sort, limit, page, search })
  .partial();

export const permissionsResponseSchema = z
  .strictObject({ id, createdAt, updatedAt })
  .array();
