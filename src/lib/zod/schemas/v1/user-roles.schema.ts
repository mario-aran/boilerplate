import { z } from '@/lib/zod';
import {
  textId as id,
  limit,
  page,
  permissionIds,
  sortUserRoles as sort,
} from '@/lib/zod/utils/fields';

// Types
export type GetAllUserRoles = z.infer<typeof getAllUserRolesSchema>;
export type GetUserRole = z.infer<typeof getUserRoleSchema>;
export type UpdateUserRole = z.infer<typeof updateUserRoleSchema>;

// Schemas
export const getAllUserRolesSchema = z.object({ sort, limit, page }).partial();
export const getUserRoleSchema = z.object({ id });
export const updateUserRoleSchema = z.object({ permissionIds }).partial();

// OpenAPI registries
const tags = ['user roles'];
