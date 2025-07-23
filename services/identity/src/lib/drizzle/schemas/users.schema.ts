import { createdAt, id, updatedAt } from '@/lib/drizzle/utils/columns';
import { getSortColumns } from '@/lib/drizzle/utils/get-sort-columns';
import { boolean, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

// Constants
export const USERS_TABLE_NAME = 'users';

export const USERS_CONSTRAINTS = {
  USERS_EMAIL_KEY: 'users_email_key',
} as const;

// Schema
export const usersTable = pgTable(USERS_TABLE_NAME, {
  id,
  createdAt,
  updatedAt,
  email: varchar('email', { length: 255 })
    .unique(USERS_CONSTRAINTS.USERS_EMAIL_KEY)
    .notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  isActive: boolean().default(true).notNull(),
  deactivatedAt: timestamp('deactivated_at'),
});

// Constants
export const USERS_SORT_COLUMNS_NO_PASSWORD = getSortColumns({
  table: usersTable,
  excludedColumns: ['password'],
});
