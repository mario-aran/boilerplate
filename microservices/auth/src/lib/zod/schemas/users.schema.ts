import { USERS_SORT_COLUMNS_NO_PASSWORD } from '@/lib/drizzle/schemas';
import {
  email,
  paramPositiveInt,
  password,
  text,
  textId,
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
const limit = paramPositiveInt;
const page = paramPositiveInt;
const sort = generateSortField(USERS_SORT_COLUMNS_NO_PASSWORD);
const search = text;
const userRoleId = textId;
const firstName = text;
const lastName = text;

// Schemas
export const userIdSchema = z.strictObject({ id });

export const getAllUsersSchema = z
  .strictObject({ limit, page, sort, search, userRoleId })
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
