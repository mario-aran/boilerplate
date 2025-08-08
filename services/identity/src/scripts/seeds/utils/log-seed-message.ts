import { logger } from '@/lib/logger/winston-logger';

export const logSeedMessage = (tableName: string, createdKeys: string[]) => {
  if (!createdKeys.length) {
    logger.info(`No new records, skipping seeding of ${tableName}`);
    return;
  }

  const joinedUniqueKeys = createdKeys.map((key) => key).join(', ');
  logger.info(`${tableName} seeded: ${joinedUniqueKeys}`);
};
