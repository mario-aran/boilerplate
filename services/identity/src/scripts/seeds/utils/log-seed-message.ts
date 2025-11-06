import { logger } from '@/lib/logger/winston';

export const logSeedMessage = (table: string, inserted: number) => {
  const message = inserted
    ? `${table} seeded: ${String(inserted)}`
    : `No new records inserted into ${table}`;

  logger.info(message);
};
