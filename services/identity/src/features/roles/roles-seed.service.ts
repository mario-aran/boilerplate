import { PERMISSION_VALUES } from '@/constants/permissions';
import { SYSTEM_ROLE_VALUES, SYSTEM_ROLES } from '@/constants/system-roles';
import { db } from '@/lib/drizzle/db';
import {
  rolesTable,
  rolesToPermissionsTable,
  RoleToPermissionInsert,
} from '@/lib/drizzle/schemas';

class RolesSeedService {
  public seedSystemData = async () => {
    const createdIds = await this.seed();
    const createdPermissionIds = await this.seedPermissions();
    return { createdIds, createdPermissionIds };
  };

  private seed = async () => {
    const createdRecords = await db
      .insert(rolesTable)
      .values(SYSTEM_ROLE_VALUES.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: rolesTable.id });

    return createdRecords.map(({ id }) => id);
  };

  private seedPermissions = async () => {
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
      .returning();

    return createdRecords.map(
      ({ roleId, permissionId }) => `${roleId}.${permissionId}`,
    );
  };
}

export const rolesSeedService = new RolesSeedService();
