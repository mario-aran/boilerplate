import {
  currentPassword,
  firstName,
  lastName,
  limit,
  newEmail,
  newPassword,
  page,
  roleId,
  search,
  sortUsers,
  uuid,
} from '@/lib/zod/utils/fields';
import { z } from 'zod';

// ---------------------------
// TYPES
// ---------------------------

export type UsersParams = z.infer<typeof usersParamsSchema>;
export type GetUsers = z.infer<typeof getUsersSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UpdateUserMe = z.infer<typeof updateUserMeSchema>;
export type UpdateUserEmail = z.infer<typeof updateUserEmailSchema>;
export type UpdateUserPassword = z.infer<typeof updateUserPasswordSchema>;

// ---------------------------
// FIELDS
// ---------------------------

const id = uuid;
const sort = sortUsers;

// ---------------------------
// SCHEMAS
// ---------------------------

export const usersParamsSchema = z.strictObject({ id });

export const getUsersSchema = z
  .strictObject({ limit, page, sort, roleId, search })
  .partial();

export const updateUserSchema = z
  .strictObject({ firstName, lastName, roleId })
  .partial();

export const updateUserMeSchema = updateUserSchema.omit({ roleId: true });
export const updateUserEmailSchema = z.strictObject({ newEmail });

export const updateUserPasswordSchema = z.strictObject({
  currentPassword,
  newPassword,
});
