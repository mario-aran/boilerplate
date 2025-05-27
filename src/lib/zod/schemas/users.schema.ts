import { USERS_COLUMNS } from '@/lib/drizzle/schemas';
import { z } from '@/lib/zod';
import {
  createdAt,
  email,
  firstName,
  lastName,
  limit,
  page,
  password,
  search,
  textId,
  updatedAt,
  uuid,
} from '@/lib/zod/utils/fields';
import { getSortColumns, refineUniqueValues } from '@/lib/zod/utils/helpers';

// Types
export type UserId = z.infer<typeof userIdSchema>;
export type GetAllUsers = z.infer<typeof getAllUsersSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UpdateUserPassword = z.infer<typeof updateUserPasswordSchema>;

// Fields
const id = uuid;
const userRoleId = textId;

const sort = refineUniqueValues(
  z
    .enum(
      getSortColumns(USERS_COLUMNS.filter((column) => column !== 'password')),
    )
    .array()
    .min(1)
    .max(50),
);

// Schemas
export const userIdSchema = z.strictObject({ id });

export const getAllUsersSchema = z
  .strictObject({ sort, limit, page, search, userRoleId })
  .partial();

export const createUserSchema = z.strictObject({
  email,
  password,
  firstName,
  lastName,
});

export const updateUserSchema = z
  .strictObject({ email, firstName, lastName, userRoleId })
  .partial();

export const updateUserPasswordSchema = z.strictObject({ password });

export const userResponseSchema = z.strictObject({
  id,
  userRoleId,
  createdAt,
  updatedAt,
  email,
  firstName,
  lastName,
});

export const usersResponseSchema = userResponseSchema.array();
