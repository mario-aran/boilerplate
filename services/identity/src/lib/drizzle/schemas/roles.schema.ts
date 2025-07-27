import { createdAt, updatedAt } from '@/lib/drizzle/utils/columns';
import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { rolesToPermissionsTable } from './roles-to-permissions.schema';
import { usersTable } from './users.schema';

// Constants
export const ROLES_TABLE_NAME = 'roles';

// Schema
export const rolesTable = pgTable(ROLES_TABLE_NAME, {
  id: varchar('id', { length: 255 }).primaryKey(),
  createdAt,
  updatedAt,
});

export const rolesRelations = relations(rolesTable, ({ many }) => ({
  users: many(usersTable),
  rolesToPermissions: many(rolesToPermissionsTable),
}));
