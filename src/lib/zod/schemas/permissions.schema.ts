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
import { getSortColumns, refineUniqueValues } from '@/lib/zod/utils/helpers';

// Types
export type GetAllPermissions = z.infer<typeof getAllPermissionsSchema>;

// Fields
const sort = refineUniqueValues(
  z.enum(getSortColumns(PERMISSIONS_COLUMNS)).array().min(1).max(50),
);

const id = textId;

// Schemas
export const getAllPermissionsSchema = z
  .strictObject({ sort, limit, page, search })
  .partial();

export const permissionsResponseSchema = z
  .strictObject({ id, createdAt, updatedAt })
  .array();
