import { USER_ROLES } from '@/constants/user-roles';
import { usersService } from '@/features/users/users.service';
import { db } from '@/lib/drizzle/db';
import { CreateUserZod } from '@/lib/zod/schemas/users.zod';
import { SEEDS_LENGTH } from '@/scripts/seeds/constants/seeds-length';
import { faker } from '@faker-js/faker';

export const seedUsers = async () => {
  // Check if all roles exist
  const roles = await db.query.userRolesSchema.findMany({
    columns: { id: true },
  });

  const allRolesPresent = Object.values(USER_ROLES).every((roleId) =>
    roles.some(({ id }) => id === roleId),
  );

  if (!allRolesPresent)
    throw new Error('Not all user roles exists on the database');

  // Mocks
  const mockedUsers = faker.helpers
    .uniqueArray(faker.internet.email, SEEDS_LENGTH)
    .map(
      (email): CreateUserZod => ({
        email,
        password: '12345678',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      }),
    );

  // Insert seeds
  for (const user of mockedUsers) {
    await usersService.create(user);
  }

  console.log('Users seeded successfully');
};
