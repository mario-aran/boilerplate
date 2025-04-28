import { USER_ROLES_COLUMNS } from '@/lib/drizzle/schemas';
import {
  createSortSchema,
  createUniqueArraySchema,
} from '@/lib/zod/utils/field-helpers';
import { limit, page, textId } from '@/lib/zod/utils/fields';
import { z } from 'zod';

// Fields
const id = textId;
const sort = createSortSchema(USER_ROLES_COLUMNS);
const permissionIds = createUniqueArraySchema(textId);

// Schemas
export const createUserRoleZod = z.object({ id });
export const readAllUserRolesZod = z.object({ limit, page, sort }).partial();
export const updateUserRoleZod = z.object({ permissionIds }).partial();

// Exported schema types
export type CreateUserRoleZod = z.infer<typeof createUserRoleZod>;
export type ReadAllUserRolesZod = z.infer<typeof readAllUserRolesZod>;
export type UpdateRoleZod = z.infer<typeof updateUserRoleZod>;
