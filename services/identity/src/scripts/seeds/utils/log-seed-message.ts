import { logger } from '@/lib/winston/logger';

export const logSeedMessage = (tableName: string, createdKeys: string[]) => {
  if (!createdKeys.length) {
    logger.info(`Skipping seeding ${tableName}: no new records`);
    return;
  }

  const joinedUniqueKeys = createdKeys.map((key) => key).join(', ');
  logger.info(`${tableName} seeded: ${joinedUniqueKeys}`);
};
