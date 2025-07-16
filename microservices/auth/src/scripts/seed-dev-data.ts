// DO NOT RENAME OR MOVE THIS FILE — used by a script in "package.json"

import { NODE_ENV } from '@/config/env';
import { USER_ROLES } from '@/constants/user-roles';
import { usersTable } from '@/lib/drizzle/schemas';
import { faker } from '@faker-js/faker';
import { authSeeder } from './utils/auth-seeder';
import { runtScriptWithCatch } from './utils/run-script-with-catch';
import { truncateTables } from './utils/truncate-tables';

// Guards
if (NODE_ENV === 'production')
  throw new Error('Seeding not allowed in production');

// Types
type UserInsert = typeof usersTable.$inferInsert;

// Utils
const mockedUsers = faker.helpers.uniqueArray(faker.internet.email, 20).map(
  (email): UserInsert => ({
    userRoleId: USER_ROLES.USER,
    email,
    password: '12345678',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  }),
);

// Run the script
(async () =>
  await runtScriptWithCatch({
    processName: 'Seeding',
    asyncFn: async () => {
      await truncateTables();
      await authSeeder.runSeeds();
      await authSeeder.seedUsers(mockedUsers);
    },
  }))();
