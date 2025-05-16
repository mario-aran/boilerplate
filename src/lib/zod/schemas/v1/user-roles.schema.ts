import { PERMISSION_VALUES } from '@/constants/permissions';
import { USER_ROLES_COLUMNS } from '@/lib/drizzle/schemas';
import { z } from '@/lib/zod';
import { limit, page, search, textId } from '@/lib/zod/utils/fields';
import { generateSortColumns } from '@/lib/zod/utils/helpers';
import { refineUniqueValues } from '@/lib/zod/utils/refines';

// Types
export type UserRoleId = z.infer<typeof userRoleIdSchema>;
export type GetAllUserRoles = z.infer<typeof getAllUserRolesSchema>;
export type UpdateUserRole = z.infer<typeof updateUserRoleSchema>;

// Fields
const id = textId;

const sort = refineUniqueValues(
  z.enum(generateSortColumns(USER_ROLES_COLUMNS)).array().min(1).max(50),
);

const permissionIds = refineUniqueValues(
  textId.array().max(PERMISSION_VALUES.length),
);

// Schemas
export const userRoleIdSchema = z.object({ id });

export const getAllUserRolesSchema = z
  .object({ sort, limit, page, search })
  .partial();

export const updateUserRoleSchema = z.object({ permissionIds }).partial();
