import { createdAt, updatedAt } from '@/lib/drizzle/utils/columns';
import { getColumnNames } from '@/lib/drizzle/utils/helpers';
import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { userRolesToPermissionsTable } from './user-roles-to-permissions.schema';
import { usersTable } from './users.schema';

// Constants
export const USER_ROLES_TABLE_NAME = 'user_roles';

// Schema
export const userRolesTable = pgTable(USER_ROLES_TABLE_NAME, {
  id: varchar('id', { length: 255 }).primaryKey(),
  createdAt,
  updatedAt,
});

export const userRolesRelations = relations(userRolesTable, ({ many }) => ({
  users: many(usersTable),
  userRolesToPermissions: many(userRolesToPermissionsTable),
}));

// Constants
export const USER_ROLES_COLUMNS = getColumnNames(userRolesTable);
