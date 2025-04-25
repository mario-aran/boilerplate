import { USER_ROLES_COLUMNS } from '@/lib/drizzle/schemas';
import { getSort } from '@/lib/zod/utils/field-helpers';
import { limit, page, textId } from '@/lib/zod/utils/fields';
import { z } from 'zod';

// Fields
const sort = getSort(USER_ROLES_COLUMNS);
const id = textId;

// Schemas
export const readAllUserRolesZod = z.object({ limit, page, sort }).partial();
export const createUserRoleZod = z.object({ id });

// Exported schema types
export type ReadAllUserRolesZod = z.infer<typeof readAllUserRolesZod>;
export type CreateUserRoleZod = z.infer<typeof createUserRoleZod>;
