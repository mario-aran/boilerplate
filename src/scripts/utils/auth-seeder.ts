import { PERMISSION_VALUES } from '@/constants/permissions';
import { USER_ROLE_VALUES, USER_ROLES } from '@/constants/user-roles';
import { db } from '@/lib/drizzle/db';
import {
  permissionsTable,
  userRolesTable,
  userRolesToPermissionsTable,
  usersTable,
} from '@/lib/drizzle/schemas';
import { hashPassword } from '@/lib/passport/utils';

// Types
type UserInsert = typeof usersTable.$inferInsert;

type UserRoleToPermissionInsert =
  typeof userRolesToPermissionsTable.$inferInsert;

interface LogSeedMessageParams {
  entityName: string;
  keys: string[];
}

class AuthSeeder {
  public runSeeds = async () => {
    await authSeeder.seedPermissions();
    await authSeeder.seedUserRoles();
    await authSeeder.seedUserRolesToPermissions();
    await authSeeder.seedUsers([
      {
        userRoleId: USER_ROLES.SUPER_ADMIN,
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
      entityName: 'users',
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
      entityName: 'permissions',
      keys: createdRecords.map(({ id }) => id),
    });
  };

  private seedUserRoles = async () => {
    const createdRecords = await db
      .insert(userRolesTable)
      .values(USER_ROLE_VALUES.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: userRolesTable.id });

    this.logSeedMessage({
      entityName: 'userRoles',
      keys: createdRecords.map(({ id }) => id),
    });
  };

  private seedUserRolesToPermissions = async () => {
    const createdRecords = await db
      .insert(userRolesToPermissionsTable)
      .values(
        PERMISSION_VALUES.map(
          (permissionId): UserRoleToPermissionInsert => ({
            userRoleId: USER_ROLES.SUPER_ADMIN,
            permissionId,
          }),
        ),
      )
      .onConflictDoNothing()
      .returning({ userRoleId: userRolesToPermissionsTable.userRoleId });

    this.logSeedMessage({
      entityName: 'userRolesToPermissions',
      keys: [...new Set(createdRecords.map(({ userRoleId }) => userRoleId))],
    });
  };

  private logSeedMessage = ({ entityName, keys }: LogSeedMessageParams) => {
    if (!keys.length) {
      console.log(`Skipping seeding ${entityName}: no new records.`);
      return;
    }

    const joinedUniqueKeys = keys.map((key) => key).join(', ');
    console.log(`${entityName} seeded successfully: ${joinedUniqueKeys}.`);
  };
}

export const authSeeder = new AuthSeeder();
