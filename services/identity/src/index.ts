// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { app } from './app';
import { BASE_URL, PORT } from './config/env';
import { verifyPool } from './lib/drizzle';
import { logger } from './lib/logger/winston-logger';
import { bullMQConnection } from './lib/redis/bullmq-connection';

(async () => {
  // Verify connections
  await verifyPool();
  await bullMQConnection.verify();

  // Start app
  const server = app.listen(PORT, () =>
    logger.info(`Application started successfully: ${BASE_URL}`),
  );

  // Verify app
  server.on('error', (err) => {
    logger.error(`Error at startup: ${err}. Forced exit`);
    process.exit(1);
  });
})();
