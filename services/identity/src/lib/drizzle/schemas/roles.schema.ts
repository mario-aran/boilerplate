import {
  getSortableColumns,
  getSwaggerColumnsObject,
} from '@/lib/drizzle/utils/column-handlers';
import { createdAt, updatedAt } from '@/lib/drizzle/utils/columns';
import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { rolesToPermissionsTable } from './roles-to-permissions.schema';
import { usersTable } from './users.schema';

// ---------------------------
// CONSTANTS
// ---------------------------

export const ROLES_TABLE_NAME = 'roles';

// ---------------------------
// SCHEMA
// ---------------------------

export const rolesTable = pgTable(ROLES_TABLE_NAME, {
  id: varchar('id', { length: 255 }).primaryKey(),
  createdAt,
  updatedAt,
});

export const rolesRelations = relations(rolesTable, ({ many }) => ({
  users: many(usersTable),
  rolesToPermissions: many(rolesToPermissionsTable),
}));

// ---------------------------
// DERIVED CONSTANTS
// ---------------------------

export const ROLES_SWAGGER_COLUMNS_OBJECT = getSwaggerColumnsObject(rolesTable);
export const ROLES_SORTABLE_COLUMNS = getSortableColumns(rolesTable);
