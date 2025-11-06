import { PERMISSION_VALUES } from '@/constants/permissions';
import { SYSTEM_ROLE_VALUES, SYSTEM_ROLES } from '@/constants/system-roles';
import { db } from '@/lib/drizzle/db';
import {
  rolesTable,
  rolesToPermissionsTable,
  RoleToPermissionInsert,
} from '@/lib/drizzle/schemas';

class RolesSeedService {
  async seed() {
    const createdRoles = await db
      .insert(rolesTable)
      .values(SYSTEM_ROLE_VALUES.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: rolesTable.id });
    return createdRoles.length;
  }

  async seedPermissionsForRole() {
    const createdPermissions = await db
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
    return createdPermissions.length;
  }
}

export const rolesSeedService = new RolesSeedService();
