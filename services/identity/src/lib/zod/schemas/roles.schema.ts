import { PERMISSION_VALUES } from '@/constants/permissions';
import { ROLES_SORT_COLUMNS } from '@/lib/drizzle/schemas';
import { stringToPositiveInt, text, textId } from '@/lib/zod/utils/fields';
import { generateSortField } from '@/lib/zod/utils/generate-sort-field';
import { noDuplicateStrs } from '@/lib/zod/utils/refines';
import { z } from 'zod';

// Types
export type GetAllRoles = z.infer<typeof getAllRolesSchema>;
export type UpdateRole = z.infer<typeof updateRoleSchema>;

// Fields
const sort = generateSortField(ROLES_SORT_COLUMNS);

const permissionIds = noDuplicateStrs(
  textId.array().max(PERMISSION_VALUES.length),
);

// Schemas
export const getAllRolesSchema = z
  .strictObject({
    limit: stringToPositiveInt,
    page: stringToPositiveInt,
    sort,
    search: text,
  })
  .partial();

export const updateRoleSchema = z.strictObject({ permissionIds });
