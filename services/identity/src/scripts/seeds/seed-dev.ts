// DO NOT RENAME OR MOVE THIS FILE — used by a script in "package.json"

import { NODE_ENV } from '@/config/env';
import { SYSTEM_ROLES } from '@/constants/system-roles';
import { usersSeedService } from '@/features/users/users-seed.service';
import { db } from '@/lib/drizzle/db';
import { UserInsert } from '@/lib/drizzle/schemas';
import { scriptCatchAsync } from '@/utils/script-catch-async';
import { faker } from '@faker-js/faker';
import { seedSystemData } from './utils/seed-system-data';

// Guards
if (NODE_ENV === 'production')
  throw new Error('Seeding not allowed in production');

// Utils
const truncateTables = async () => {
  const selectTableNamesQuery = `
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'public';
`;

  const { rows } = await db.execute<{ table_name: string }>(
    selectTableNamesQuery,
  );
  if (!rows.length) {
    console.log('No tables to truncate');
    return;
  }

  const joinedTableNames = rows.map(({ table_name }) => table_name).join(', ');
  const truncateTablesQuery = `
    TRUNCATE TABLE ${joinedTableNames}
    RESTART IDENTITY
    CASCADE;
  `;
  await db.execute(truncateTablesQuery);
  console.log(`${joinedTableNames} tables truncated successfully`);
};

const seedDev = async () => {
  await truncateTables();
  await seedSystemData();

  const mockedUsers = faker.helpers.uniqueArray(faker.internet.email, 20).map(
    (email): UserInsert => ({
      email,
      password: '12345678',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      roleId: SYSTEM_ROLES.USER,
    }),
  );
  await usersSeedService.seed(mockedUsers);
};

// Run script
(async () => {
  await scriptCatchAsync(seedDev);
})();
