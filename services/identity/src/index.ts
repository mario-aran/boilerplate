// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { app } from './app';
import { BASE_URL, PORT } from './config/env';
import { testDbConnection } from './lib/drizzle/db';
import { logger } from './lib/logger/winston-logger';
import { bullMQConnection } from './lib/redis/bullmq-connection';

(async () => {
  // Verify connections
  await testDbConnection();
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
