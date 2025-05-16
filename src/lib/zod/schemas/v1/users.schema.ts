import { z } from '@/lib/zod';
import {
  email,
  firstName,
  uuid as id,
  lastName,
  limit,
  page,
  password,
  search,
  sortUsers as sort,
  textId as userRoleId,
} from '@/lib/zod/utils/fields';

// Types
export type GetAllUsers = z.infer<typeof getAllUsersSchema>;
export type GetUser = z.infer<typeof getUserSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UpdateUserPassword = z.infer<typeof updateUserPasswordSchema>;

// Schemas
export const getAllUsersSchema = z
  .object({ sort, limit, page, search, userRoleId })
  .partial();

export const getUserSchema = z.object({ id });

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

// OpenAPI registries
const tags = ['users'];
