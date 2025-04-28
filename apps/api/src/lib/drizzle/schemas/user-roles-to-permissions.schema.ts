import { getColumns } from '@/lib/drizzle/utils/get-column-values';
import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';
import { permissionsSchema } from './permissions.schema';
import { userRolesSchema } from './user-roles.schema';

export const userRolesToPermissionsSchema = pgTable(
  'user_roles_to_permissions',
  {
    userRoleId: varchar('user_role_id', { length: 255 })
      .notNull()
      .references(() => userRolesSchema.id),
    permissionId: varchar('permission_id', { length: 255 })
      .notNull()
      .references(() => permissionsSchema.id),
  },
  (t) => [primaryKey({ columns: [t.userRoleId, t.permissionId] })],
);

export const userRolesToPermissionsRelations = relations(
  userRolesToPermissionsSchema,
  ({ one }) => ({
    userRole: one(userRolesSchema, {
      fields: [userRolesToPermissionsSchema.userRoleId],
      references: [userRolesSchema.id],
    }),
    permission: one(permissionsSchema, {
      fields: [userRolesToPermissionsSchema.permissionId],
      references: [permissionsSchema.id],
    }),
  }),
);

export const USER_ROLES_TO_PERMISSIONS_COLUMNS = getColumns(
  userRolesToPermissionsSchema,
);
