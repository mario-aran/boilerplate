// DO NOT RENAME OR MOVE THIS FILE — used by a script in "package.json"

import cors from 'cors';
import express from 'express';
import { BASE_URL, PORT } from './config/env';
import { passportInit } from './features/auth/passport/passport-init';
import { morganInit } from './lib/logger/morgan-init';
import { logger } from './lib/logger/winston-logger';
import { errorHandler } from './middleware/error-handler';
import { router } from './router';

const app = express();

// Middlewares setup
app.use(morganInit);
app.use(cors());
app.use(express.json()); // Body parser
app.use(passportInit); // Must be placed after "express.json"
app.use(router); // Must be placed after all but before error handler
app.use(errorHandler); // Must be placed last

// Start the app
app.listen(PORT, () => {
  logger.info(`Application started successfully: ${BASE_URL}`);
});

// Guard: Check app at startup
app.on('error', (err) => {
  logger.error(`Application failed at startup: ${err}`);
  process.exit(1); // Exit on failure
});
