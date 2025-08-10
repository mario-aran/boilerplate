import { logger } from '@/lib/logger/winston-logger';

export const scriptCatchAsync = async (asyncFn: () => Promise<void>) => {
  try {
    await asyncFn();
    logger.info('Script completed successfully');
    process.exit(0); // Exit on success
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'unknown error';
    logger.error(`Script failed: ${errorMessage}`);
    process.exit(1); // Exit on failure
  }
};
