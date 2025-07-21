import { createdAt, id, updatedAt } from '@/lib/drizzle/utils/columns';
import { getSortColumns } from '@/lib/drizzle/utils/get-sort-columns';
import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { rolesTable } from './roles.schema';

// Constants
export const USERS_TABLE_NAME = 'users';

// Schema
export const usersTable = pgTable(USERS_TABLE_NAME, {
  id,
  roleId: varchar('role_id', { length: 255 })
    .notNull()
    .references(() => rolesTable.id),
  createdAt,
  updatedAt,
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
});

export const usersRelations = relations(usersTable, ({ one }) => ({
  role: one(rolesTable, {
    fields: [usersTable.roleId],
    references: [rolesTable.id],
  }),
}));

// Constants
export const USERS_SORT_COLUMNS_NO_PASSWORD = getSortColumns({
  table: usersTable,
  excludedColumns: ['password'],
});
