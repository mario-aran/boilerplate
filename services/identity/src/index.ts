// DO NOT RENAME OR MOVE THIS FILE — used by a script in "package.json"

import cors from 'cors';
import express from 'express';
import { PORT } from './config/env';
import { passportInit } from './features/auth/passport';
import { router } from './router';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Body parser
app.use(passportInit); // Must be placed after all parsers
app.use(router); // Must be placed last

// Start the server
app
  .listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  })
  .on('error', (error) => {
    console.error(`Server failed to start: ${error}`);
    process.exit(1);
  });
