import {
  currentPassword,
  firstName,
  isActive,
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
export type UpdateUserMe = z.infer<typeof updateUserMeSchema>;
export type UpdateUserMePassword = z.infer<typeof updateUserMePasswordSchema>;
export type UpdateUserMeEmail = z.infer<typeof updateUserMeEmailSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;

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

export const updateUserMeSchema = z
  .strictObject({ firstName, lastName })
  .partial();

export const updateUserMePasswordSchema = z.strictObject({
  currentPassword,
  newPassword,
});

export const updateUserMeEmailSchema = z.strictObject({ newEmail });

export const updateUserSchema = updateUserMeSchema
  .extend({ roleId, isActive })
  .partial();
