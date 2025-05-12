import { PERMISSION_VALUES } from '@/constants/permissions';
import { USER_ROLE_VALUES, USER_ROLES } from '@/constants/user-roles';
import { db } from '@/lib/drizzle/db';
import {
  permissionsSchema,
  userRolesSchema,
  userRolesToPermissionsSchema,
  usersSchema,
} from '@/lib/drizzle/schemas';
import { hashPassword } from '@/lib/passport/utils';

// Types
type User = typeof usersSchema.$inferInsert;
type UserRoleToPermission = typeof userRolesToPermissionsSchema.$inferInsert;

interface LogSeedMessageProps {
  entityName: string;
  keys: string[];
}

class AuthSeeder {
  public async runSeeds() {
    await authSeeder.seedPermissions();
    await authSeeder.seedUserRoles();
    await authSeeder.seedUserRolesToPermissions();
    await authSeeder.seedUsers([
      {
        userRoleId: USER_ROLES.SUPERADMIN,
        email: 'superadmin@superadmin.com',
        password: '12345678',
        firstName: 'Super Admin',
        lastName: 'Super Admin',
      },
    ]);
  }

  public async seedUsers(data: User[]) {
    const hashedUserPromises = data.map(
      async ({ password, ...restOfRecord }) => {
        const hashedPassword = await hashPassword(password);
        return { ...restOfRecord, password: hashedPassword };
      },
    );
    const usersWithHashedPassword = await Promise.all(hashedUserPromises);

    const createdRecords = await db
      .insert(usersSchema)
      .values(usersWithHashedPassword)
      .onConflictDoNothing()
      .returning({ email: usersSchema.email });

    this.logSeedMessage({
      entityName: 'users',
      keys: createdRecords.map(({ email }) => email),
    });
  }

  private async seedPermissions() {
    const createdRecords = await db
      .insert(permissionsSchema)
      .values(PERMISSION_VALUES.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: permissionsSchema.id });

    this.logSeedMessage({
      entityName: 'permissions',
      keys: createdRecords.map(({ id }) => id),
    });
  }

  private async seedUserRoles() {
    const createdRecords = await db
      .insert(userRolesSchema)
      .values(USER_ROLE_VALUES.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: userRolesSchema.id });

    this.logSeedMessage({
      entityName: 'userRoles',
      keys: createdRecords.map(({ id }) => id),
    });
  }

  private async seedUserRolesToPermissions() {
    const createdRecords = await db
      .insert(userRolesToPermissionsSchema)
      .values(
        PERMISSION_VALUES.map(
          (permissionId): UserRoleToPermission => ({
            userRoleId: USER_ROLES.SUPERADMIN,
            permissionId,
          }),
        ),
      )
      .onConflictDoNothing()
      .returning({ userRoleId: userRolesToPermissionsSchema.userRoleId });

    this.logSeedMessage({
      entityName: 'userRolesToPermissions',
      keys: [...new Set(createdRecords.map(({ userRoleId }) => userRoleId))],
    });
  }

  private logSeedMessage({ entityName, keys }: LogSeedMessageProps) {
    if (!keys.length) {
      console.log(`Skipping seeding ${entityName}: no new records.`);
      return;
    }

    const joinedUniqueKeys = keys.map((key) => key).join(', ');
    console.log(`${entityName} seeded successfully: ${joinedUniqueKeys}.`);
  }
}

export const authSeeder = new AuthSeeder();
