import { USERS_COLUMNS } from '@/lib/drizzle/schemas';
import { z } from '@/lib/zod';
import {
  email,
  firstName,
  lastName,
  limit,
  page,
  password,
  search,
  textId,
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
export const userIdSchema = z.object({ id });

export const getAllUsersSchema = z
  .object({ sort, limit, page, search, userRoleId })
  .partial();

export const createUserSchema = z.object({
  email,
  password,
  firstName,
  lastName,
});

export const updateUserSchema = z
  .object({ email, firstName, lastName, userRoleId })
  .partial();

export const updateUserPasswordSchema = z.object({ password });
