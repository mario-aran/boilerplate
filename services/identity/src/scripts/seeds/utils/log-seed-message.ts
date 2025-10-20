import { logger } from '@/lib/logger/winston-logger';

export const logSeedMessage = (table: string, inserted: number) => {
  const message = inserted
    ? `${table} seeded: ${inserted}`
    : `No new records inserted into ${table}`;

  logger.info(message);
};
