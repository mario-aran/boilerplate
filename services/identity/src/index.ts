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
    logger.error(`Error at startup: ${err}. Forced exit`);
    process.exit(1);
  });
})();
