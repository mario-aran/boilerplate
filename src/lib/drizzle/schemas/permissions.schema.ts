import { createdAt, updatedAt } from '@/lib/drizzle/utils/columns';
import { getColumnNames } from '@/lib/drizzle/utils/get-column-names';
import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { userRolesToPermissionsTable } from './user-roles-to-permissions.schema';

// Constants
export const PERMISSIONS_TABLE_NAME = 'permissions';

// Schema
export const permissionsTable = pgTable(PERMISSIONS_TABLE_NAME, {
  id: varchar('id', { length: 255 }).primaryKey(),
  createdAt,
  updatedAt,
});

export const permissionsRelations = relations(permissionsTable, ({ many }) => ({
  userRolesToPermissions: many(userRolesToPermissionsTable),
}));

// Constants
export const PERMISSIONS_COLUMNS = getColumnNames(permissionsTable);
