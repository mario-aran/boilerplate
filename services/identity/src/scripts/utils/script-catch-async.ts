import { logger } from '@/lib/winston/logger';

export const scriptCatchAsync = async (asyncFn: () => Promise<void>) => {
  try {
    await asyncFn();
    logger.info('Script completed successfully');
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'unknown error';
    logger.error(`Script failed: ${errorMessage}`);
    process.exit(1);
  }
};
