// DO NOT RENAME OR MOVE THIS FILE — used by a script in "package.json"

import '@/config/load-dotenv'; // "dotenv": Ensure its loaded before env imports

import { NODE_ENV } from '@/config/env';
import { USER_ROLES } from '@/constants/user-roles';
import { usersSchema } from '@/lib/drizzle/schemas';
import { scriptCatchAsync } from '@/scripts/utils';
import { faker } from '@faker-js/faker';
import { SEEDS_LENGTH } from './constants';
import { authSeeder } from './utils/auth-seeder';
import { truncateTables } from './utils/truncate-tables';

// Guards
if (NODE_ENV === 'production')
  throw new Error('Seeding not allowed in production');

// Types
type User = typeof usersSchema.$inferInsert;

// Utils
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

const runScript = async () => {
  await truncateTables();
  await authSeeder.runSeeds();
  await authSeeder.seedUsers(mockedUsers);
};

// Run the script
(async () => {
  await scriptCatchAsync({
    processName: 'Seeding',
    asyncFn: runScript,
  });
})();
