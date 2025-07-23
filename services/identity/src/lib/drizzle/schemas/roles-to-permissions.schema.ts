import { createdAt, updatedAt } from '@/lib/drizzle/utils/columns';
import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';
import { permissionsTable } from './permissions.schema';
import { rolesTable } from './roles.schema';

// Constants
export const ROLES_TO_PERMISSIONS_TABLE_NAME = 'roles_to_permissions';

// Schema
export const rolesToPermissionsTable = pgTable(
  ROLES_TO_PERMISSIONS_TABLE_NAME,
  {
    roleId: varchar('role_id', { length: 255 })
      .notNull()
      .references(() => rolesTable.id),
    permissionId: varchar('permission_id', { length: 255 })
      .notNull()
      .references(() => permissionsTable.id),
    createdAt,
    updatedAt,
  },
  (t) => [primaryKey({ columns: [t.roleId, t.permissionId] })],
);

export const rolesToPermissionsRelations = relations(
  rolesToPermissionsTable,
  ({ one }) => ({
    role: one(rolesTable, {
      fields: [rolesToPermissionsTable.roleId],
      references: [rolesTable.id],
    }),
    permission: one(permissionsTable, {
      fields: [rolesToPermissionsTable.permissionId],
      references: [permissionsTable.id],
    }),
  }),
);
