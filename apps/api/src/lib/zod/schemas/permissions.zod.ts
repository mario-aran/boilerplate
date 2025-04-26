import { PERMISSIONS_COLUMNS } from '@/lib/drizzle/schemas';
import { getSort } from '@/lib/zod/utils/field-helpers';
import { limit, page } from '@/lib/zod/utils/fields';
import { z } from 'zod';

// Fields
const sort = getSort(PERMISSIONS_COLUMNS);

// Schemas
export const readAllPermissionsZod = z.object({ limit, page, sort }).partial();

// Exported schema types
export type ReadAllPermissionsZod = z.infer<typeof readAllPermissionsZod>;
