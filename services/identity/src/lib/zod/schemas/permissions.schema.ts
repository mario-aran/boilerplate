import { limit, page, search, sortPermissions } from '@/lib/zod/utils/fields';
import { z } from 'zod';

// ---------------------------
// TYPES
// ---------------------------

export type GetPermissions = z.infer<typeof getPermissionsSchema>;

// ---------------------------
// FIELDS
// ---------------------------

const sort = sortPermissions;

// ---------------------------
// SCHEMAS
// ---------------------------

export const getPermissionsSchema = z
  .strictObject({ limit, page, sort, search })
  .partial();
