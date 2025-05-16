import { z } from '@/lib/zod';
import { limit, page, sortPermissions as sort } from '@/lib/zod/utils/fields';

// Types
export type GetAllPermissions = z.infer<typeof getAllPermissionsSchema>;

// Schemas
export const getAllPermissionsSchema = z
  .object({ sort, limit, page })
  .partial();

// OpenAPI registries
const tags = ['permissions'];
