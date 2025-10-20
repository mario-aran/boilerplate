import {
  limit,
  page,
  permissionIds,
  search,
  sortRoles,
  textId,
} from '@/lib/zod/utils/fields';
import { z } from 'zod';

// ---------------------------
// TYPES
// ---------------------------

export type GetRoles = z.infer<typeof getRolesSchema>;
export type CreateRole = z.infer<typeof createRoleSchema>;
export type UpdateRole = z.infer<typeof updateRoleSchema>;

// ---------------------------
// FIELDS
// ---------------------------

const id = textId;
const sort = sortRoles;

// ---------------------------
// SCHEMAS
// ---------------------------

export const roleIdSchema = z.strictObject({ id });

export const getRolesSchema = z
  .strictObject({ limit, page, sort, search })
  .partial();

export const createRoleSchema = z.strictObject({ id });
export const updateRoleSchema = z.strictObject({ permissionIds }).partial();
