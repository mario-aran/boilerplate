import { USERS_COLUMNS } from '@/lib/drizzle/schemas';
import { getSort } from '@/lib/zod/utils/field-helpers';
import {
  email,
  limit,
  page,
  password,
  text,
  textId,
} from '@/lib/zod/utils/fields';
import { z } from 'zod';

// Prepare values
const usersWithoutPassword = USERS_COLUMNS.filter(
  (column) => column !== 'password',
);

// Fields
const sort = getSort(usersWithoutPassword);
const userRoleId = textId;
const search = text;
const firstName = text;
const lastName = text;

// Schemas
export const getAllUsersZod = z
  .object({ limit, page, sort, userRoleId, search })
  .partial();

export const updateUserZod = z
  .object({ firstName, lastName, email, userRoleId })
  .partial();

export const updateUserPasswordZod = z.object({ password });

// Exported schema types
export type GetAllUsersZod = z.infer<typeof getAllUsersZod>;
export type UpdateUserZod = z.infer<typeof updateUserZod>;
export type UpdateUserPasswordZod = z.infer<typeof updateUserPasswordZod>;
