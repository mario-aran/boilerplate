import { PERMISSIONS_COLUMNS } from '@/lib/drizzle/schemas';
import { createSortSchema } from '@/lib/zod/utils/field-helpers';
import { limit, page, textId } from '@/lib/zod/utils/fields';
import { z } from 'zod';

// Fields
const id = textId;
const sort = createSortSchema(PERMISSIONS_COLUMNS);

// Schemas
export const createPermissionZod = z.object({ id });
export const readAllPermissionsZod = z.object({ limit, page, sort }).partial();

// Exported schema types
export type CreatePermissionZod = z.infer<typeof createPermissionZod>;
export type ReadAllPermissionsZod = z.infer<typeof readAllPermissionsZod>;
