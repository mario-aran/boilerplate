import { z } from '@/lib/zod';
import {
  userRoleId as id,
  limit,
  page,
  permissionIds,
  sortUserRoles as sort,
} from '@/lib/zod/utils/fields';

// Types
export type ReadAllUserRolesZod = z.infer<typeof ReadAllUserRolesZod>;
export type CreateUserRoleZod = z.infer<typeof CreateUserRoleZod>;
export type UpdateUserRoleZod = z.infer<typeof UpdateUserRoleZod>;

// Schemas
export const ReadAllUserRolesZod = z.object({ sort, limit, page }).partial();
export const CreateUserRoleZod = z.object({ id });
export const UpdateUserRoleZod = z.object({ permissionIds }).partial();

// OpenAPI registries
