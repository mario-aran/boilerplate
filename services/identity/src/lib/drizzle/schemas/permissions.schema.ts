import {
  getSortableColumns,
  getSwaggerColumnsObject,
} from '@/lib/drizzle/utils/column-utils';
import { createdAt, updatedAt } from '@/lib/drizzle/utils/columns';
import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { rolesToPermissionsTable } from './roles-to-permissions.schema';

// ---------------------------
// CONSTANTS
// ---------------------------

export const PERMISSIONS_TABLE_NAME = 'permissions';

// ---------------------------
// SCHEMA
// ---------------------------

export const permissionsTable = pgTable(PERMISSIONS_TABLE_NAME, {
  id: varchar('id', { length: 255 }).primaryKey(),
  createdAt,
  updatedAt,
});

export const permissionsRelations = relations(permissionsTable, ({ many }) => ({
  rolesToPermissions: many(rolesToPermissionsTable),
}));

// ---------------------------
// DERIVED CONSTANTS
// ---------------------------

export const PERMISSIONS_SWAGGER_COLUMNS_OBJECT =
  getSwaggerColumnsObject(permissionsTable);

export const PERMISSIONS_SORTABLE_COLUMNS =
  getSortableColumns(permissionsTable);
