import { createdAt, updatedAt } from '@/lib/drizzle/utils/columns';
import { getColumns } from '@/lib/drizzle/utils/get-columns';
import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { userRolesToPermissionsTable } from './user-roles-to-permissions.schema';

export const permissionsTable = pgTable('permissions', {
  id: varchar('id', { length: 255 }).primaryKey(),
  createdAt,
  updatedAt,
});

export const permissionsRelations = relations(permissionsTable, ({ many }) => ({
  userRolesToPermissions: many(userRolesToPermissionsTable),
}));

export const PERMISSIONS_COLUMNS = getColumns(permissionsTable);
