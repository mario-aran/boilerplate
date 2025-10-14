// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { app } from './app';
import { BASE_URL, PORT } from './config/env';
import { checkQueueConnection } from './lib/bullmq/clients';
import { checkDbConnection } from './lib/drizzle/db';
import { logger } from './lib/logger/winston-logger';

(async () => {
  // Check connections
  await checkDbConnection();
  await checkQueueConnection();

  // Start app
  const server = app.listen(PORT, () =>
    logger.info(`Application started successfully: ${BASE_URL}`),
  );
  server.on('error', (err) => {
    logger.error(`Error at startup: ${err}. Forced exit`);
    process.exit(1);
  });
})();
