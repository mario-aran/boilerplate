import { PERMISSION_VALUES } from '@/constants/permissions';
import { ROLE_VALUES, ROLES } from '@/constants/roles';
import { db } from '@/lib/drizzle/db';
import {
  PERMISSIONS_TABLE_NAME,
  permissionsTable,
  USER_ROLES_TABLE_NAME,
  USER_ROLES_TO_PERMISSIONS_TABLE_NAME,
  userRolesTable,
  userRolesToPermissionsTable,
  USERS_TABLE_NAME,
  usersTable,
} from '@/lib/drizzle/schemas';
import { hashPassword } from '@/lib/passport/utils';

// Types
type UserInsert = typeof usersTable.$inferInsert;

type UserRoleToPermissionInsert =
  typeof userRolesToPermissionsTable.$inferInsert;

interface LogSeedMessageProps {
  tableName: string;
  keys: string[];
}

class AuthSeeder {
  public runSeeds = async () => {
    await authSeeder.seedPermissions();
    await authSeeder.seedUserRoles();
    await authSeeder.seedUserRolesToPermissions();
    await authSeeder.seedUsers([
      {
        userRoleId: ROLES.SUPER_ADMIN,
        email: 'superadmin@superadmin.com',
        password: '12345678',
        firstName: 'Super Admin',
        lastName: 'Super Admin',
      },
    ]);
  };

  public seedUsers = async (data: UserInsert[]) => {
    const hashedUserPromises = data.map(
      async ({ password, ...restOfRecord }) => {
        const hashedPassword = await hashPassword(password);
        return { ...restOfRecord, password: hashedPassword };
      },
    );
    const usersWithHashedPassword = await Promise.all(hashedUserPromises);

    const createdRecords = await db
      .insert(usersTable)
      .values(usersWithHashedPassword)
      .onConflictDoNothing()
      .returning({ email: usersTable.email });

    this.logSeedMessage({
      tableName: USERS_TABLE_NAME,
      keys: createdRecords.map(({ email }) => email),
    });
  };

  private seedPermissions = async () => {
    const createdRecords = await db
      .insert(permissionsTable)
      .values(PERMISSION_VALUES.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: permissionsTable.id });

    this.logSeedMessage({
      tableName: PERMISSIONS_TABLE_NAME,
      keys: createdRecords.map(({ id }) => id),
    });
  };

  private seedUserRoles = async () => {
    const createdRecords = await db
      .insert(userRolesTable)
      .values(ROLE_VALUES.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: userRolesTable.id });

    this.logSeedMessage({
      tableName: USER_ROLES_TABLE_NAME,
      keys: createdRecords.map(({ id }) => id),
    });
  };

  private seedUserRolesToPermissions = async () => {
    const createdRecords = await db
      .insert(userRolesToPermissionsTable)
      .values(
        PERMISSION_VALUES.map(
          (permissionId): UserRoleToPermissionInsert => ({
            userRoleId: ROLES.SUPER_ADMIN,
            permissionId,
          }),
        ),
      )
      .onConflictDoNothing()
      .returning({ userRoleId: userRolesToPermissionsTable.userRoleId });

    this.logSeedMessage({
      tableName: USER_ROLES_TO_PERMISSIONS_TABLE_NAME,
      keys: [...new Set(createdRecords.map(({ userRoleId }) => userRoleId))],
    });
  };

  private logSeedMessage = ({ tableName, keys }: LogSeedMessageProps) => {
    if (!keys.length) {
      console.log(`Skipping seeding ${tableName}: no new records`);
      return;
    }

    const joinedUniqueKeys = keys.map((key) => key).join(', ');
    console.log(`${tableName} seeded successfully: ${joinedUniqueKeys}`);
  };
}

export const authSeeder = new AuthSeeder();
