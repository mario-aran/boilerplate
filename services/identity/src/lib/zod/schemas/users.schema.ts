import { USERS_SORT_COLUMNS_NO_PASSWORD } from '@/lib/drizzle/schemas';
import {
  email,
  password,
  stringToPositiveInt,
  text,
  textId,
  uuid,
} from '@/lib/zod/utils/fields';
import { generateSortField } from '@/lib/zod/utils/generate-sort-field';
import { z } from 'zod';

// Types
export type GetAllUsers = z.infer<typeof getAllUsersSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema> &
  z.infer<typeof updateUserPasswordSchema>;

// Schemas
export const userIdSchema = z.strictObject({ id: uuid });

export const getAllUsersSchema = z
  .strictObject({
    limit: stringToPositiveInt,
    page: stringToPositiveInt,
    sort: generateSortField(USERS_SORT_COLUMNS_NO_PASSWORD),
    roleId: textId,
    search: text,
  })
  .partial();

export const updateUserSchema = z
  .strictObject({ email, firstName: text, lastName: text })
  .partial();

export const updateUserPasswordSchema = z.strictObject({ password });

/*
  roleId: varchar('user_role_id', { length: 255 })
  email: varchar('email', { length: 255 }).unique().notNull(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  pendingEmail: varchar('pending_email', { length: 255 }),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
*/
