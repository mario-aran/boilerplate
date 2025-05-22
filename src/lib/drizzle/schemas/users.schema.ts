import { createdAt, id, updatedAt } from '@/lib/drizzle/utils/columns';
import { getColumnNames } from '@/lib/drizzle/utils/helpers';
import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { userRolesTable } from './user-roles.schema';

// Constants
export const USERS_TABLE_NAME = 'users';

// Schema
export const usersTable = pgTable(USERS_TABLE_NAME, {
  id,
  userRoleId: varchar('user_role_id', { length: 255 })
    .notNull()
    .references(() => userRolesTable.id),
  createdAt,
  updatedAt,
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
});

export const usersRelations = relations(usersTable, ({ one }) => ({
  userRole: one(userRolesTable, {
    fields: [usersTable.userRoleId],
    references: [userRolesTable.id],
  }),
}));

// Constants
export const USERS_COLUMNS = getColumnNames(usersTable);
