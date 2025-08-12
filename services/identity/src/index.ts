// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { app } from './app';
import { BASE_URL, PORT } from './config/env';
import { dbConnection } from './lib/drizzle/db-connection';
import { logger } from './lib/logger/winston-logger';
import { bullMQConnection } from './lib/redis/bullmq-connection';

(async () => {
  // Verify connections
  await dbConnection.verify();
  await bullMQConnection.verify();

  // Start the app
  const server = app.listen(PORT, () =>
    logger.info(`Application started successfully: ${BASE_URL}`),
  );

  // Verify the app
  server.on('error', (err) => {
    logger.error(`Error at startup: ${err}. Exiting now`);
    process.exit(1);
  });

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

    // Close connections
    await bullMQConnection.close();
    await dbConnection.close();

    server.close(() => {
      logger.info('Shutdown successful');
      process.exit(0);
    });
  };
  process.on('SIGINT', shutdown); // User interrupt signal
  process.on('SIGTERM', shutdown); // System termination signal
})();
