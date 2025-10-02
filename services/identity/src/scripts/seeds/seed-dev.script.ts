// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { isProduction } from '@/config/env';
import { usersSeedService } from '@/features/users/users-seed.service';
import { db } from '@/lib/drizzle/db';
import { USERS_TABLE_NAME } from '@/lib/drizzle/schemas';
import { logger } from '@/lib/logger/winston-logger';
import { scriptCatchAsync } from '@/scripts/utils/script-catch-async';
import { logSeedMessage } from './utils/log-seed-message';
import { seedSystemData } from './utils/seed-system-data';

// ---------------------------
// GUARDS
// ---------------------------

if (isProduction) throw new Error('Script not allowed in production');

// ---------------------------
// UTILS
// ---------------------------

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

const seedFakeData = async () => {
  const { createdKeys } = await usersSeedService.seedFake(20);
  logSeedMessage(USERS_TABLE_NAME, createdKeys);
};

// ---------------------------
// SCRIPT
// ---------------------------

(async () => {
  await scriptCatchAsync(async () => {
    await truncateTables();
    await seedSystemData();
    await seedFakeData();
  });
})();
