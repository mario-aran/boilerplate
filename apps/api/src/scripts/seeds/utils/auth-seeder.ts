import { PERMISSIONS } from '@/constants/permissions';
import { USER_ROLES } from '@/constants/user-roles';
import { db } from '@/lib/drizzle/db';
import {
  permissionsSchema,
  userRolesSchema,
  userRolesToPermissionsSchema,
  usersSchema,
} from '@/lib/drizzle/schemas';
import { hashPassword } from '@/lib/passport/utils/hash-password';
import { getUniqueObjectValues } from '@/utils/get-unique-object-values';

type User = typeof usersSchema.$inferInsert;
type UserRoleToPermission = typeof userRolesToPermissionsSchema.$inferInsert;

interface LogSeedMessageProps {
  keys: string[];
  entityName: string;
}

const permissionValues = getUniqueObjectValues(PERMISSIONS);
const userRoleValues = getUniqueObjectValues(USER_ROLES);

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
      keys: createdRecords.map(({ email }) => email),
      entityName: 'users',
    });
  }

  private async seedPermissions() {
    const createdRecords = await db
      .insert(permissionsSchema)
      .values(permissionValues.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: permissionsSchema.id });

    this.logSeedMessage({
      keys: createdRecords.map(({ id }) => id),
      entityName: 'permissions',
    });
  }

  private async seedUserRoles() {
    const createdRecords = await db
      .insert(userRolesSchema)
      .values(userRoleValues.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: userRolesSchema.id });

    this.logSeedMessage({
      keys: createdRecords.map(({ id }) => id),
      entityName: 'userRoles',
    });
  }

  private async seedUserRolesToPermissions() {
    const values = permissionValues.map(
      (permissionId): UserRoleToPermission => ({
        userRoleId: USER_ROLES.SUPERADMIN,
        permissionId,
      }),
    );

    const createdRecords = await db
      .insert(userRolesToPermissionsSchema)
      .values(values)
      .onConflictDoNothing()
      .returning({ userRoleId: userRolesToPermissionsSchema.userRoleId });

    const uniqueKeys = [
      ...new Set(createdRecords.map(({ userRoleId }) => userRoleId)),
    ];

    this.logSeedMessage({
      keys: uniqueKeys,
      entityName: 'userRolesToPermissions',
    });
  }

  private logSeedMessage({ keys, entityName }: LogSeedMessageProps) {
    if (!keys.length) {
      console.log(`Skipping seeding ${entityName}: no new records.`);
      return;
    }

    const joinedUniqueKeys = keys.map((key) => key).join(', ');
    console.log(`${entityName} seeded successfully: ${joinedUniqueKeys}.`);
  }
}

export const authSeeder = new AuthSeeder();
