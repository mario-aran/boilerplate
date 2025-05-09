import { z } from '@/lib/zod';
import {
  permissionId as id,
  limit,
  page,
  sortPermissions as sort,
} from '@/lib/zod/utils/fields';

// Types
export type ReadAllPermissionsZod = z.infer<typeof ReadAllPermissionsZod>;
export type CreatePermissionZod = z.infer<typeof CreatePermissionZod>;

// Schemas
export const ReadAllPermissionsZod = z.object({ sort, limit, page }).partial();
export const CreatePermissionZod = z.object({ id });

// OpenAPI registries
