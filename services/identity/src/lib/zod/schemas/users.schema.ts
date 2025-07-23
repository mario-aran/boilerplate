import { USERS_SORT_COLUMNS_NO_PASSWORD } from '@/lib/drizzle/schemas';
import {
  email,
  password,
  stringToPositiveInt,
  text,
  uuid,
} from '@/lib/zod/utils/fields';
import { generateSortField } from '@/lib/zod/utils/generate-sort-field';
import { z } from 'zod';

// Types
export type UserId = z.infer<typeof userIdSchema>;
export type GetAllUsers = z.infer<typeof getAllUsersSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UpdateUserPassword = z.infer<typeof updateUserPasswordSchema>;

// Fields
const id = uuid;
const limit = stringToPositiveInt;
const page = stringToPositiveInt;
const sort = generateSortField(USERS_SORT_COLUMNS_NO_PASSWORD);
const search = text;
const firstName = text.optional();
const lastName = text.optional();

// Schemas
export const userIdSchema = z.strictObject({ id });

export const getAllUsersSchema = z
  .strictObject({ limit, page, sort, search })
  .partial();

export const createUserSchema = z.strictObject({
  email,
  password,
  firstName,
  lastName,
});

export const updateUserSchema = z
  .strictObject({ email, firstName, lastName })
  .partial();

export const updateUserPasswordSchema = z.strictObject({ password });
