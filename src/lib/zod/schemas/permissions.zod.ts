import { PERMISSIONS_COLUMNS } from '@/lib/drizzle/schemas';
import { z } from '@/lib/zod';
import { createSortSchema } from '@/lib/zod/utils/field-helpers';
import { limit, page, textId } from '@/lib/zod/utils/fields';

// Fields
const id = textId;
const sort = createSortSchema(PERMISSIONS_COLUMNS);

// Schemas
export const CreatePermissionZod = z.object({ id });
export const ReadAllPermissionsZod = z.object({ limit, page, sort }).partial();

// Exported schema types
export type CreatePermissionZod = z.infer<typeof CreatePermissionZod>;
export type ReadAllPermissionsZod = z.infer<typeof ReadAllPermissionsZod>;
