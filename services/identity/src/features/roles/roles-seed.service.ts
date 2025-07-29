import { PERMISSION_VALUES } from '@/constants/permissions';
import { SYSTEM_ROLE_VALUES, SYSTEM_ROLES } from '@/constants/system-roles';
import { db } from '@/lib/drizzle/db';
import {
  ROLES_TABLE_NAME,
  ROLES_TO_PERMISSIONS_TABLE_NAME,
  rolesTable,
  rolesToPermissionsTable,
  RoleToPermissionInsert,
} from '@/lib/drizzle/schemas';
import { getSeedMessage } from '@/utils/get-seed-message';

class RolesSeedService {
  public seedProductionData = async () => {
    await this.seedSystemRoles();
    await this.seedSuperAdminPermissions();
  };

  private seedSystemRoles = async () => {
    const createdRecords = await db
      .insert(rolesTable)
      .values(SYSTEM_ROLE_VALUES.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: rolesTable.id });

    const createdKeys = createdRecords.map(({ id }) => id);
    const seedMessage = getSeedMessage(ROLES_TABLE_NAME, createdKeys);
    console.log(seedMessage);
  };

  private seedSuperAdminPermissions = async () => {
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

    const createdKeys = createdRecords.map(
      ({ roleId, permissionId }) => `${roleId}.${permissionId}`,
    );
    const seedMessage = getSeedMessage(
      ROLES_TO_PERMISSIONS_TABLE_NAME,
      createdKeys,
    );
    console.log(seedMessage);
  };
}

export const rolesSeedService = new RolesSeedService();
