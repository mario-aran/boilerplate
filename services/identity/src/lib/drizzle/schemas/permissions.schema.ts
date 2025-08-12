import {
  getExampleColumns,
  getSortColumns,
} from '@/lib/drizzle/utils/column-handlers';
import { createdAt, updatedAt } from '@/lib/drizzle/utils/columns';
import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { rolesToPermissionsTable } from './roles-to-permissions.schema';

// Constants
export const PERMISSIONS_TABLE_NAME = 'permissions';

// Schema
export const permissionsTable = pgTable(PERMISSIONS_TABLE_NAME, {
  id: varchar('id', { length: 255 }).primaryKey(),
  createdAt,
  updatedAt,
});

export const permissionsRelations = relations(permissionsTable, ({ many }) => ({
  rolesToPermissions: many(rolesToPermissionsTable),
}));

// Columns
export const PERMISSIONS_SORT_COLUMNS = getSortColumns(permissionsTable);
export const PERMISSIONS_EXAMPLE_COLUMNS = getExampleColumns(permissionsTable);
