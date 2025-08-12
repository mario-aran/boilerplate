// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { dbConnection } from '@/lib/drizzle/db-connection';
import { logger } from '@/lib/logger/winston-logger';
import { bullMQConnection } from '@/lib/redis/bullmq-connection';
import { EmailVerificationWorker } from './email-verification.worker';

(async () => {
  // Verify connections
  await dbConnection.verify();
  await bullMQConnection.verify();

  // Start the workers
  const emailVerificationWorker = new EmailVerificationWorker();

  // Graceful shutdown
  let isShuttingDown = false;
  const shutdown = async () => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    // Force shutdown after 10 seconds
    setTimeout(() => {
      logger.error('Shutdown timeout, forcing exit');
      process.exit(1);
    }, 10000);

    // Close workers
    await emailVerificationWorker.close();

    // Close connections
    await bullMQConnection.close();
    await dbConnection.close();

    logger.info('Shutdown successful');
    process.exit(0);
  };
  process.on('SIGINT', shutdown); // User interrupt signal
  process.on('SIGTERM', shutdown); // System termination signal
})();
