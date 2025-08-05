// DO NOT RENAME OR MOVE THIS FILE — used by a script in "package.json"

import cors from 'cors';
import express from 'express';
import { BASE_URL, PORT } from './config/env';
import { passportInit } from './features/auth/passport/passport-init';
import { logger } from './lib/winston/logger';
import { errorHandler } from './middleware/error-handler';
import { morganLogger } from './middleware/morgan-logger';
import { router } from './router';

const app = express();

// Middleware setup
app.use(morganLogger);
app.use(cors());
app.use(express.json()); // Body parser
app.use(passportInit); // Must be placed after express.json
app.use(router); // Must be placed after all but before error handler
app.use(errorHandler); // Must be placed last

// Start the server
app
  .listen(PORT, () => {
    logger.info(`Server running on ${BASE_URL}`);
  })
  .on('error', (error) => {
    logger.error(`Server failed to start: ${error}`);
    process.exit(1);
  });
