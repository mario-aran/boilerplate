import { PERMISSIONS_COLUMNS } from '@/lib/drizzle/schemas';
import { z } from '@/lib/zod';
import { createSortSchema } from '@/lib/zod/utils/field-helpers';
import { limit, page, permissionId } from '@/lib/zod/utils/fields';

// Types
export type ReadAllPermissionsZod = z.infer<typeof ReadAllPermissionsZod>;
export type CreatePermissionZod = z.infer<typeof CreatePermissionZod>;

// Fields
const sort = createSortSchema(PERMISSIONS_COLUMNS);
const id = permissionId;

// Schemas
export const ReadAllPermissionsZod = z.object({ sort, limit, page }).partial();
export const CreatePermissionZod = z.object({ id });
