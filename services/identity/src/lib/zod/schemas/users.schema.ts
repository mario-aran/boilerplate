import { USERS_SORTABLE_COLUMNS } from '@/lib/drizzle/schemas';
import {
  email,
  firstName,
  lastName,
  limit,
  page,
  password,
  roleId,
  search,
  uuid,
} from '@/lib/zod/utils/fields';
import { generateSortField } from '@/lib/zod/utils/generate-sort-field';
import { z } from 'zod';

// ---------------------------
// TYPES
// ---------------------------

export type UserId = z.infer<typeof userIdSchema>;
export type GetUsers = z.infer<typeof getUsersSchema>;
export type UpdateUserMe = z.infer<typeof updateUserMeSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;

// ---------------------------
// FIELDS
// ---------------------------

const id = uuid;
const sort = generateSortField(USERS_SORTABLE_COLUMNS);

// ---------------------------
// SCHEMAS
// ---------------------------

export const userIdSchema = z.strictObject({ id });

export const getUsersSchema = z
  .strictObject({ limit, page, sort, roleId, search })
  .partial();

export const updateUserMeSchema = z
  .strictObject({ email, password, firstName, lastName })
  .partial();

export const updateUserSchema = updateUserMeSchema.extend({ roleId });
