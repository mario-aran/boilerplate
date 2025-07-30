// DO NOT RENAME OR MOVE THIS FILE — used by a script in "package.json"

import { NODE_ENV } from '@/config/env';
import { SYSTEM_ROLES } from '@/constants/system-roles';
import { UserInsert } from '@/lib/drizzle/schemas';
import { faker } from '@faker-js/faker';
import { authSeeder } from './utils/auth-seeder';
import { scriptCatchAsync } from './utils/script-with-catch';
import { truncateTables } from './utils/truncate-tables';

// Guards
if (NODE_ENV === 'production')
  throw new Error('Seeding not allowed in production');

// Utils
const mockedUsers = faker.helpers.uniqueArray(faker.internet.email, 20).map(
  (email): UserInsert => ({
    roleId: SYSTEM_ROLES.USER,
    email,
    password: '12345678',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  }),
);

// Run the script
(async () =>
  await scriptCatchAsync('Seeding', async () => {
    await truncateTables();
    await authSeeder.runSeeds();
    await authSeeder.seedUsers(mockedUsers);
  }))();
