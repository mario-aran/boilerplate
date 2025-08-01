// DO NOT RENAME OR MOVE THIS FILE — used by a script in "package.json"

import cors from 'cors';
import express from 'express';
import { BASE_URL, PORT } from './config/env';
import { passportInit } from './features/auth/passport/passport-init';
import { globalErrorHandler } from './middleware/global-error-handler';
import { router } from './router';

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); // Body parser
app.use(passportInit); // Must be placed after all parsers

// Router middleware: must be placed before global error
app.use(router);

// Global error middleware: must be placed last
app.use(globalErrorHandler);

// Start the server
app
  .listen(PORT, () => {
    console.log(`Server running on: ${BASE_URL}`);
  })
  .on('error', (error) => {
    console.error(`Server failed to start: ${error}`);
    process.exit(1);
  });
