// note: DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { AddressInfo } from 'net';
import { app } from './app';
import { PORT } from './config/env';
import { checkQueueConnection } from './lib/bullmq/clients';
import { checkDbConnection } from './lib/drizzle/db';
import { logger } from './lib/logger/winston';

void (async () => {
  // Check connections
  await checkDbConnection();
  await checkQueueConnection();

  // Start app
  const server = app.listen(PORT, () => {
    const { address, port } = server.address() as AddressInfo;
    logger.info(
      `Application started successfully: http://${address}:${String(port)}`,
    );
  });
  server.on('error', (err) => {
    logger.error(`Application failed to start: ${err}. Exiting`);
    process.exit(1);
  });
})();
