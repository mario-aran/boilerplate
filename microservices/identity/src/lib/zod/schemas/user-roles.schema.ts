import { PERMISSION_VALUES } from '@/constants/permissions';
import { USER_ROLES_SORT_COLUMNS } from '@/lib/drizzle/schemas';
import { paramPositiveInt, text, textId } from '@/lib/zod/utils/fields';
import { generateSortField } from '@/lib/zod/utils/generate-sort-field';
import { z } from 'zod';

// Types
export type UserRoleId = z.infer<typeof userRoleIdSchema>;
export type GetAllUserRoles = z.infer<typeof getAllUserRolesSchema>;
export type UpdateUserRole = z.infer<typeof updateUserRoleSchema>;

// Fields
const id = textId;
const limit = paramPositiveInt;
const page = paramPositiveInt;
const sort = generateSortField(USER_ROLES_SORT_COLUMNS);
const search = text;

const permissionIds = textId
  .array()
  .max(PERMISSION_VALUES.length)
  .refine((values) => new Set(values).size === values.length, {
    message: 'Array must not contain duplicate values',
  });

// Schemas
export const userRoleIdSchema = z.strictObject({ id });

export const getAllUserRolesSchema = z
  .strictObject({ limit, page, sort, search })
  .partial();

export const updateUserRoleSchema = z.strictObject({ permissionIds }).partial();
