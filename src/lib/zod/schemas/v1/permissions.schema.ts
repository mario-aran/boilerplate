import { z } from '@/lib/zod';
import {
  limit,
  page,
  search,
  sortPermissions as sort,
} from '@/lib/zod/utils/fields';

// Types
export type GetAllPermissions = z.infer<typeof getAllPermissionsSchema>;

// Schemas
export const getAllPermissionsSchema = z
  .object({ sort, limit, page, search })
  .partial();

// OpenAPI registries
const tags = ['permissions'];
