import { createdAt, updatedAt } from '@/lib/drizzle/utils/columns';
import { getColumnNames } from '@/lib/drizzle/utils/helpers';
import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';
import { permissionsTable } from './permissions.schema';
import { userRolesTable } from './user-roles.schema';

export const userRolesToPermissionsTable = pgTable(
  'user_roles_to_permissions',
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

export const USER_ROLES_TO_PERMISSIONS_COLUMNS = getColumnNames(
  userRolesToPermissionsTable,
);
