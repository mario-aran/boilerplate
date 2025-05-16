import { z } from '@/lib/zod';
import { limit, page, search, sortPermissions } from '@/lib/zod/utils/fields';

// Types
export type GetAllPermissions = z.infer<typeof getAllPermissionsSchema>;

// Fields
const sort = sortPermissions;

// Schemas
export const getAllPermissionsSchema = z
  .object({ sort, limit, page, search })
  .partial();
