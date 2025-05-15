import { createdAt, updatedAt } from '@/lib/drizzle/utils/columns';
import { getColumns } from '@/lib/drizzle/utils/get-columns';
import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { userRolesToPermissionsTable } from './user-roles-to-permissions.schema';
import { usersTable } from './users.schema';

export const userRolesTable = pgTable('user_roles', {
  id: varchar('id', { length: 255 }).primaryKey(),
  createdAt,
  updatedAt,
});

export const userRolesRelations = relations(userRolesTable, ({ many }) => ({
  users: many(usersTable),
  userRolesToPermissions: many(userRolesToPermissionsTable),
}));

export const USER_ROLES_COLUMNS = getColumns(userRolesTable);
