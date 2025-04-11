import { USERS_COLUMNS } from '@/lib/drizzle/schemas';
import { z } from 'zod';
import { getOrderBy } from './utils/field-helpers';
import { email, id, limit, name, password, skip } from './utils/fields';

// Fields
const firstName = name;
const lastName = name;
const orderBy = getOrderBy(USERS_COLUMNS);

// Schemas
export const getAllUsersZod = z.object({ orderBy, limit, skip }).partial();

export const createUsersZod = z.object({
  firstName,
  lastName,
  email,
  password,
});

export const updateUsersZod = z
  .object({ firstName, lastName, email, userRoleId: id })
  .partial();

export const updatePasswordUsersZod = z.object({ password });

// Exported schema types
export type GetAllUsersZod = z.infer<typeof getAllUsersZod>;
export type CreateUsersZod = z.infer<typeof createUsersZod>;
export type UpdateUsersZod = z.infer<typeof updateUsersZod>;
export type UpdatePasswordUsersZod = z.infer<typeof updatePasswordUsersZod>;
