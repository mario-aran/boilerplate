import { SYSTEM_ROLES } from '@/constants/system-roles';
import {
  getSortableColumns,
  getSwaggerColumnsObject,
} from '@/lib/drizzle/utils/column-handlers';
import { createdAt, id, updatedAt } from '@/lib/drizzle/utils/columns';
import { relations } from 'drizzle-orm';
import { boolean, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { rolesTable } from './roles.schema';

// ---------------------------
// TYPES
// ---------------------------

export type UserInsert = typeof usersTable.$inferInsert;
export type UserSelect = typeof usersTable.$inferSelect;

// ---------------------------
// CONSTANTS
// ---------------------------

export const USERS_TABLE_NAME = 'users';

// ---------------------------
// SCHEMA
// ---------------------------

export const usersTable = pgTable(USERS_TABLE_NAME, {
  id,
  roleId: varchar('role_id', { length: 255 })
    .default(SYSTEM_ROLES.USER)
    .notNull()
    .references(() => rolesTable.id),
  createdAt,
  updatedAt,
  email: varchar('email', { length: 255 }).unique().notNull(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  emailVerifiedAt: timestamp('email_verified_at'),
  pendingEmail: varchar('pending_email', { length: 255 }),
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

// ---------------------------
// DERIVED CONSTANTS
// ---------------------------

const excluded = ['password'] as const;

export const USERS_SWAGGER_COLUMNS_OBJECT = getSwaggerColumnsObject(
  usersTable,
  excluded,
);

export const USERS_SORTABLE_COLUMNS = getSortableColumns(usersTable, excluded);
