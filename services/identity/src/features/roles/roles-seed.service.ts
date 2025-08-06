import { PERMISSION_VALUES } from '@/constants/permissions';
import { SYSTEM_ROLE_VALUES, SYSTEM_ROLES } from '@/constants/system-roles';
import { db } from '@/lib/drizzle/db';
import {
  rolesTable,
  rolesToPermissionsTable,
  RoleToPermissionInsert,
} from '@/lib/drizzle/schemas';

class RolesSeedService {
  public seed = async () => {
    const createdRecords = await db
      .insert(rolesTable)
      .values(SYSTEM_ROLE_VALUES.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: rolesTable.id });

    const createdKeys = createdRecords.map(({ id }) => id);
    return { createdKeys };
  };

  public seedPermissions = async () => {
    const createdRecords = await db
      .insert(rolesToPermissionsTable)
      .values(
        PERMISSION_VALUES.map(
          (permissionId): RoleToPermissionInsert => ({
            roleId: SYSTEM_ROLES.SUPER_ADMIN,
            permissionId,
          }),
        ),
      )
      .onConflictDoNothing()
      .returning({
        roleId: rolesToPermissionsTable.roleId,
        permissionId: rolesToPermissionsTable.permissionId,
      });

    const createdKeys = createdRecords.map(
      ({ roleId, permissionId }) => `${roleId}.${permissionId}`,
    );
    return { createdKeys };
  };
}

export const rolesSeedService = new RolesSeedService();
