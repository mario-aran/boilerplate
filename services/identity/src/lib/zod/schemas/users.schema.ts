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

export type GetUsers = z.infer<typeof getUsersSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UpdateUserMe = z.infer<typeof updateUserMeSchema>;
export type UpdateUserMeEmail = z.infer<typeof updateUserMeEmailSchema>;
export type UpdateUserMePassword = z.infer<typeof updateUserMePasswordSchema>;

// ---------------------------
// FIELDS
// ---------------------------

const id = uuid;
const sort = sortUsers;

// ---------------------------
// SCHEMAS
// ---------------------------

export const userIdSchema = z.strictObject({ id });

export const getUsersSchema = z
  .strictObject({ limit, page, sort, roleId, search })
  .partial();

export const updateUserSchema = z
  .strictObject({ firstName, lastName, roleId })
  .partial();

export const updateUserMeSchema = updateUserSchema.omit({ roleId: true });
export const updateUserMeEmailSchema = z.strictObject({ newEmail });

export const updateUserMePasswordSchema = z.strictObject({
  currentPassword,
  newPassword,
});
