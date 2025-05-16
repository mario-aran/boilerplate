import { z } from '@/lib/zod';
import {
  limit,
  page,
  permissionIds,
  search,
  sortUserRoles,
  textId,
} from '@/lib/zod/utils/fields';

// Types
export type UserRoleId = z.infer<typeof userRoleIdSchema>;
export type GetAllUserRoles = z.infer<typeof getAllUserRolesSchema>;
export type UpdateUserRole = z.infer<typeof updateUserRoleSchema>;

// Fields
const id = textId;
const sort = sortUserRoles;

// Schemas
export const userRoleIdSchema = z.object({ id });

export const getAllUserRolesSchema = z
  .object({ sort, limit, page, search })
  .partial();

export const updateUserRoleSchema = z.object({ permissionIds }).partial();
