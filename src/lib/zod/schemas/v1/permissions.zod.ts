import { z } from '@/lib/zod';
import { limit, page, sortPermissions as sort } from '@/lib/zod/utils/fields';

// Types
export type ReadAllPermissionsZod = z.infer<typeof ReadAllPermissionsZod>;

// Schemas
export const ReadAllPermissionsZod = z.object({ sort, limit, page }).partial();

// OpenAPI registries
