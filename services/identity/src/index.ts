// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import cors from 'cors';
import express from 'express';
import { BASE_URL, PORT } from './config/env';
import { passportInit } from './features/auth/passport/passport-init';
import { verifyDBConnection } from './lib/drizzle/utils/verify-db-connection';
import { morganInit } from './lib/logger/morgan-init';
import { logger } from './lib/logger/winston-logger';
import { verifyRedisConnection } from './lib/redis/utils/verify-redis-connection';
import { errorHandler } from './middleware/error-handler';
import { router } from './router';

// App
const app = express();

// App middlewares
app.use(morganInit);
app.use(cors());
app.use(express.json()); // Body parser
app.use(passportInit); // Must be placed after "express.json"
app.use(router); // Must be placed after all but before error handler
app.use(errorHandler); // Must be placed last

// Server
const startServer = async () => {
  // Verify connections
  await verifyDBConnection();
  await verifyRedisConnection();

  // Start the app
  const server = app.listen(PORT, () => {
    logger.info(`Application started successfully: ${BASE_URL}`);
    process.exit(0); // Explicitly exit on success
  });

  // Verify the app
  server.on('error', (err) => {
    logger.error(`Application failed at startup: ${err}`);
    process.exit(1); // Exit on failure
  });
};

// Run the script
(async () => {
  await startServer();
})();
