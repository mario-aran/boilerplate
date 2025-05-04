import { createdAt, id, updatedAt } from '@/lib/drizzle/utils/columns';
import { getColumns } from '@/lib/drizzle/utils/get-columns';
import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { userRolesSchema } from './user-roles.schema';

export const usersSchema = pgTable('users', {
  id,
  userRoleId: varchar('user_role_id', { length: 255 })
    .notNull()
    .references(() => userRolesSchema.id),
  createdAt,
  updatedAt,
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
});

export const usersRelations = relations(usersSchema, ({ one }) => ({
  userRole: one(userRolesSchema, {
    fields: [usersSchema.userRoleId],
    references: [userRolesSchema.id],
  }),
}));

export const USERS_COLUMNS = getColumns(usersSchema);
