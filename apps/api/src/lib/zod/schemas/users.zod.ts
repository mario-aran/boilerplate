import { USERS_COLUMNS } from '@/lib/drizzle/schemas';
import { z } from 'zod';
import { getSort } from '../utils/field-helpers';
import { email, limit, password, skip, text, textId } from '../utils/fields';

// Fields
const sort = getSort(USERS_COLUMNS);
const userRoleId = textId;
const q = text;
const firstName = text;
const lastName = text;

// Schemas
export const getAllUsersZod = z
  .object({ limit, skip, sort, userRoleId, q })
  .partial();

export const createUsersZod = z.object({
  firstName,
  lastName,
  email,
  password,
});

export const updateUsersZod = z
  .object({ firstName, lastName, email, userRoleId })
  .partial();

export const updatePasswordUsersZod = z.object({ password });

// Exported schema types
export type GetAllUsersZod = z.infer<typeof getAllUsersZod>;
export type CreateUsersZod = z.infer<typeof createUsersZod>;
export type UpdateUsersZod = z.infer<typeof updateUsersZod>;
export type UpdatePasswordUsersZod = z.infer<typeof updatePasswordUsersZod>;
