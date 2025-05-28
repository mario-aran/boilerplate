import { createdAt, updatedAt } from '@/lib/drizzle/utils/columns';
import { getColumnNames } from '@/lib/drizzle/utils/get-column-names';
import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';
import { permissionsTable } from './permissions.schema';
import { userRolesTable } from './user-roles.schema';

// Constants
export const USER_ROLES_TO_PERMISSIONS_TABLE_NAME = 'user_roles_to_permissions';

// Schema
export const userRolesToPermissionsTable = pgTable(
  USER_ROLES_TO_PERMISSIONS_TABLE_NAME,
  {
    userRoleId: varchar('user_role_id', { length: 255 })
      .notNull()
      .references(() => userRolesTable.id),
    permissionId: varchar('permission_id', { length: 255 })
      .notNull()
      .references(() => permissionsTable.id),
    createdAt,
    updatedAt,
  },
  (t) => [primaryKey({ columns: [t.userRoleId, t.permissionId] })],
);

export const userRolesToPermissionsRelations = relations(
  userRolesToPermissionsTable,
  ({ one }) => ({
    userRole: one(userRolesTable, {
      fields: [userRolesToPermissionsTable.userRoleId],
      references: [userRolesTable.id],
    }),
    permission: one(permissionsTable, {
      fields: [userRolesToPermissionsTable.permissionId],
      references: [permissionsTable.id],
    }),
  }),
);

// Constants
export const USER_ROLES_TO_PERMISSIONS_COLUMNS = getColumnNames(
  userRolesToPermissionsTable,
);
