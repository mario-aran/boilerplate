// DO NOT RENAME OR MOVE THIS FILE — used by a script in "package.json"

import { Server } from 'http';
import { app } from './app';
import { BASE_URL, PORT } from './config/env';
import { verifyDBConnection } from './lib/drizzle/utils/verify-db-connection';
import { logger } from './lib/logger/winston-logger';
import { verifyRedisConnection } from './lib/redis/utils/verify-redis-connection';

export const startServer = async (): Promise<Server> => {
  // Verify connections
  await verifyDBConnection();
  await verifyRedisConnection();

  return new Promise((resolve) => {
    const server = app.listen(PORT, () => {
      logger.info(`Application started successfully: ${BASE_URL}`);
      resolve(server);
    });

    // Verify the app
    server.on('error', (err) => {
      logger.error(`Application failed at startup: ${err}`);
      process.exit(1); // Exit on failure
    });
  });
};

// Start the server
(async () => {
  await startServer();
})();
