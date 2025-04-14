import { USER_ROLES_COLUMNS } from '@/lib/drizzle/schemas';
import { getSort } from '@/lib/zod/utils/field-helpers';
import { limit, page, text, textId } from '@/lib/zod/utils/fields';
import { z } from 'zod';

// Fields
const sort = getSort(USER_ROLES_COLUMNS);
const search = text;
const name = text;
const id = textId;

// Schemas
export const getAllUserRolesZod = z
  .object({ limit, page, sort, search })
  .partial();

export const createUserRoleZod = z.object({ id, name });
export const updateUserRoleZod = z.object({ name }).partial();

// Exported schema types
export type GetAllUserRolesZod = z.infer<typeof getAllUserRolesZod>;
export type CreateUserRoleZod = z.infer<typeof createUserRoleZod>;
export type UpdateUserRoleZod = z.infer<typeof updateUserRoleZod>;
