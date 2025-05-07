import { USER_ROLES_COLUMNS } from '@/lib/drizzle/schemas';
import { z } from '@/lib/zod';
import {
  createSortSchema,
  createUniqueArraySchema,
} from '@/lib/zod/utils/field-helpers';
import { limit, page, textId } from '@/lib/zod/utils/fields';

// Fields
const id = textId;
const sort = createSortSchema(USER_ROLES_COLUMNS);
const permissionIds = createUniqueArraySchema(textId);

// Schemas
export const CreateUserRoleZod = z.object({ id });
export const ReadAllUserRolesZod = z.object({ limit, page, sort }).partial();
export const UpdateUserRoleZod = z.object({ permissionIds }).partial();

// Exported schema types
export type CreateUserRoleZod = z.infer<typeof CreateUserRoleZod>;
export type ReadAllUserRolesZod = z.infer<typeof ReadAllUserRolesZod>;
export type UpdateUserRoleZod = z.infer<typeof UpdateUserRoleZod>;
