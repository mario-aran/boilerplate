import { PERMISSION_VALUES } from '@/constants/permissions';
import { ROLES_SORT_COLUMNS } from '@/lib/drizzle/schemas';
import { stringToPositiveInt, text, textId } from '@/lib/zod/utils/fields';
import { generateSortField } from '@/lib/zod/utils/generate-sort-field';
import { noDuplicateStrs } from '@/lib/zod/utils/refines';
import { z } from 'zod';

// Types
export type RoleId = z.infer<typeof roleIdSchema>;
export type GetAllRoles = z.infer<typeof getAllRolesSchema>;
export type CreateRole = z.infer<typeof createRoleSchema>;
export type UpdateRole = z.infer<typeof updateRoleSchema>;

// Fields
const id = textId;

// Schemas
export const roleIdSchema = z.strictObject({ id });

export const getAllRolesSchema = z
  .strictObject({
    limit: stringToPositiveInt,
    page: stringToPositiveInt,
    sort: generateSortField(ROLES_SORT_COLUMNS),
    search: text,
  })
  .partial();

export const createRoleSchema = z.strictObject({ id });

export const updateRoleSchema = z
  .strictObject({
    permissionIds: noDuplicateStrs(
      textId.array().max(PERMISSION_VALUES.length),
    ),
  })
  .partial();
