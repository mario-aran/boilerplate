import { PERMISSION_VALUES } from '@/constants/permissions';
import { ROLES_SORTABLE_COLUMNS } from '@/lib/drizzle/schemas';
import { limit, page, search, textId } from '@/lib/zod/utils/fields';
import { generateSortField } from '@/lib/zod/utils/generate-sort-field';
import { noDuplicateStrs } from '@/lib/zod/utils/refines';
import { z } from 'zod';

// ---------------------------
// TYPES
// ---------------------------

export type RoleId = z.infer<typeof roleIdSchema>;
export type GetRoles = z.infer<typeof getRolesSchema>;
export type CreateRole = z.infer<typeof createRoleSchema>;
export type UpdateRole = z.infer<typeof updateRoleSchema>;

// ---------------------------
// FIELDS
// ---------------------------

const id = textId;
const sort = generateSortField(ROLES_SORTABLE_COLUMNS);

const permissionIds = noDuplicateStrs(
  z.enum(PERMISSION_VALUES).array().max(PERMISSION_VALUES.length),
);

// ---------------------------
// SCHEMAS
// ---------------------------

export const roleIdSchema = z.strictObject({ id });

export const getRolesSchema = z
  .strictObject({ limit, page, sort, search })
  .partial();

export const createRoleSchema = z.strictObject({ id });
export const updateRoleSchema = z.strictObject({ permissionIds }).partial();
