import { USERS_SORT_COLUMNS_NO_PASSWORD } from '@/lib/drizzle/schemas';
import {
  email,
  password,
  stringToPositiveInt,
  text,
  textId,
} from '@/lib/zod/utils/fields';
import { generateSortField } from '@/lib/zod/utils/generate-sort-field';
import { z } from 'zod';

// Types
export type GetAllUsers = z.infer<typeof getAllUsersSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;

// Schemas
export const getAllUsersSchema = z
  .strictObject({
    limit: stringToPositiveInt,
    page: stringToPositiveInt,
    sort: generateSortField(USERS_SORT_COLUMNS_NO_PASSWORD),
    roleId: textId,
    search: text,
  })
  .partial();

export const createUserSchema = z.strictObject({
  email,
  password,
  firstName: text.optional(),
  lastName: text.optional(),
});

export const updateUserSchema = z
  .strictObject({ email, password, firstName: text, lastName: text })
  .partial();
