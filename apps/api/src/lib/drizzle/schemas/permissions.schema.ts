import { createdAt, updatedAt } from '@/lib/drizzle/utils/columns';
import { getColumns } from '@/lib/drizzle/utils/get-column-values';
import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { userRolesToPermissionsSchema } from './user-roles-to-permissions.schema';

export const permissionsSchema = pgTable('permissions', {
  id: varchar('id', { length: 255 }).primaryKey(),
  createdAt,
  updatedAt,
});

export const permissionsRelations = relations(
  permissionsSchema,
  ({ many }) => ({
    userRolesToPermissions: many(userRolesToPermissionsSchema),
  }),
);

export const PERMISSIONS_COLUMNS = getColumns(permissionsSchema);
