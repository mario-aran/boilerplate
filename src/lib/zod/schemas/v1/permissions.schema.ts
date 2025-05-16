import { PERMISSIONS_COLUMNS } from '@/lib/drizzle/schemas';
import { z } from '@/lib/zod';
import { limit, page, search } from '@/lib/zod/utils/fields';
import { generateSortColumns } from '@/lib/zod/utils/helpers';
import { refineUniqueValues } from '@/lib/zod/utils/refines';

// Types
export type GetAllPermissions = z.infer<typeof getAllPermissionsSchema>;

// Fields
const sort = refineUniqueValues(
  z.enum(generateSortColumns(PERMISSIONS_COLUMNS)).array().min(1).max(50),
);

// Schemas
export const getAllPermissionsSchema = z
  .object({ sort, limit, page, search })
  .partial();
