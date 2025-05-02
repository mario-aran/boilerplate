// WARNING: This file is used by a script in "package.json". Do not rename or move

import '@/config/load-env';

import { NODE_ENV } from '@/config/env';
import { USER_ROLES } from '@/constants/user-roles';
import { usersSchema } from '@/lib/drizzle/schemas';
import { faker } from '@faker-js/faker';
import { SEEDS_LENGTH } from './constants/seeds-length';
import { authSeeder } from './utils/auth-seeder';
import { truncateTables } from './utils/truncate-tables';

type User = typeof usersSchema.$inferInsert;

const mockedUsers = faker.helpers
  .uniqueArray(faker.internet.email, SEEDS_LENGTH)
  .map(
    (email): User => ({
      userRoleId: USER_ROLES.USER,
      email,
      password: '12345678',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    }),
  );

(async () => {
  // Never run this script in production
  if (NODE_ENV === 'production')
    throw new Error('Seeding not allowed in production');

  try {
    // Reset tables
    await truncateTables();

    // Seeds
    await authSeeder.runSeeds();
    await authSeeder.seedUsers(mockedUsers);

    console.log('Database seeded successfully');
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    throw new Error(`Seeding error: ${errorMessage}`);
  }
})();
