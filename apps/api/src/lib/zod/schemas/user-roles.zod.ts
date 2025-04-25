import { USER_ROLES_COLUMNS } from '@/lib/drizzle/schemas';
import { getSort } from '@/lib/zod/utils/field-helpers';
import { limit, page, textId } from '@/lib/zod/utils/fields';
import { z } from 'zod';

// Fields
const id = textId;
const sort = getSort(USER_ROLES_COLUMNS);

// Schemas
export const createUserRoleZod = z.object({ id });
export const readAllUserRolesZod = z.object({ limit, page, sort }).partial();

// Exported schema types
export type CreateUserRoleZod = z.infer<typeof createUserRoleZod>;
export type ReadAllUserRolesZod = z.infer<typeof readAllUserRolesZod>;
