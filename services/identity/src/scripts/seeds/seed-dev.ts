// DO NOT RENAME OR MOVE THIS FILE — used by a script in "package.json"

import { NODE_ENV } from '@/config/env';
import { SYSTEM_ROLES } from '@/constants/system-roles';
import { usersSeedService } from '@/features/users/users-seed.service';
import { db } from '@/lib/drizzle/db';
import { UserInsert, USERS_TABLE_NAME } from '@/lib/drizzle/schemas';
import { logger } from '@/lib/winston/logger';
import { scriptCatchAsync } from '@/scripts/utils/script-catch-async';
import { faker } from '@faker-js/faker';
import { logSeedMessage } from './utils/log-seed-message';
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
    logger.info('No tables to truncate');
    return;
  }

  const joinedTableNames = rows.map(({ table_name }) => table_name).join(', ');
  const truncateTablesQuery = `
    TRUNCATE TABLE ${joinedTableNames}
    RESTART IDENTITY
    CASCADE;
  `;
  await db.execute(truncateTablesQuery);
  logger.info(`${joinedTableNames} tables truncated successfully`);
};

const seedFakeUsers = async () => {
  const mockedUsers = faker.helpers.uniqueArray(faker.internet.email, 20).map(
    (email): UserInsert => ({
      email,
      password: '12345678',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      roleId: SYSTEM_ROLES.USER,
    }),
  );
  const { createdKeys } = await usersSeedService.seedUsers(mockedUsers);
  logSeedMessage(USERS_TABLE_NAME, createdKeys);
};

const seedDev = async () => {
  await truncateTables();
  await seedSystemData();
  await seedFakeUsers();
};

// Run script
(async () => {
  await scriptCatchAsync(seedDev);
})();
