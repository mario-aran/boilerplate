import { PERMISSION_VALUES } from '@/constants/permissions';
import { USER_ROLES_COLUMNS } from '@/lib/drizzle/schemas';
import { limit, page, search, textId } from '@/lib/zod/utils/fields';
import { generateSortField } from '@/lib/zod/utils/generate-sort-field';
import { z } from 'zod';

// Types
export type UserRoleId = z.infer<typeof userRoleIdSchema>;
export type GetAllUserRoles = z.infer<typeof getAllUserRolesSchema>;
export type UpdateUserRole = z.infer<typeof updateUserRoleSchema>;

// Fields
const id = textId;
const sort = generateSortField(USER_ROLES_COLUMNS);

const permissionIds = textId
  .array()
  .max(PERMISSION_VALUES.length)
  .refine((values) => new Set(values).size === values.length, {
    message: 'Array must not contain duplicate values',
  });

// Schemas
export const userRoleIdSchema = z.strictObject({ id });

export const getAllUserRolesSchema = z
  .strictObject({ sort, limit, page, search })
  .partial();

export const updateUserRoleSchema = z.strictObject({ permissionIds }).partial();
