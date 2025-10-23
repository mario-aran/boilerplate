import { SYSTEM_ROLES } from '@/constants/system-roles';
import { hashPassword } from '@/lib/bcrypt/utils';
import { db } from '@/lib/drizzle/db';
import { UserInsert, usersTable } from '@/lib/drizzle/schemas';
import { faker } from '@faker-js/faker';

class UsersSeedService {
  async seed() {
    return this.seedUsers([
      {
        roleId: SYSTEM_ROLES.SUPER_ADMIN,
        email: 'superadmin@superadmin.com',
        emailVerified: true,
        emailVerifiedAt: new Date(),
        password: SYSTEM_ROLES.SUPER_ADMIN,
      },
    ]);
  }

  async seedFake(count: number) {
    return this.seedUsers(
      faker.helpers.uniqueArray(faker.internet.email, count).map(
        (email): UserInsert => ({
          email,
          emailVerified: true,
          emailVerifiedAt: new Date(),
          password: email,
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
        }),
      ),
    );
  }

  private async seedUsers(users: UserInsert[]) {
    const hashedUserPromises = users.map(
      async ({ password, ...restOfUsers }) => ({
        ...restOfUsers,
        password: await hashPassword(password),
      }),
    );
    const hashedUsers = await Promise.all(hashedUserPromises);

    const createdRecords = await db
      .insert(usersTable)
      .values(hashedUsers)
      .onConflictDoNothing()
      .returning({ email: usersTable.email });
    return createdRecords.length;
  }
}

export const usersSeedService = new UsersSeedService();
