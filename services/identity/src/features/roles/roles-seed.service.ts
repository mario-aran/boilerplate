import { PERMISSION_VALUES } from '@/constants/permissions';
import { SYSTEM_ROLE_VALUES, SYSTEM_ROLES } from '@/constants/system-roles';
import { DrizzleDb } from '@/lib/drizzle';
import {
  rolesTable,
  rolesToPermissionsTable,
  RoleToPermissionInsert,
} from '@/lib/drizzle/schemas';

// Types
interface RolesSeedServiceProps {
  db: DrizzleDb;
}

export class RolesSeedService {
  private readonly db: DrizzleDb;

  constructor({ db }: RolesSeedServiceProps) {
    this.db = db;
  }

  async seed() {
    const createdRecords = await this.db
      .insert(rolesTable)
      .values(SYSTEM_ROLE_VALUES.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: rolesTable.id });

    const createdKeys = createdRecords.map(({ id }) => id);
    return { createdKeys };
  }

  async seedPermissions() {
    const createdRecords = await this.db
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
  }
}
