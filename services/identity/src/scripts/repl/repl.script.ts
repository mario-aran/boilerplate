// DO NOT RENAME OR MOVE THIS FILE — used by a script in "package.json"

import { startServer } from '@/.';
import { app } from '@/app';
import { NODE_ENV } from '@/config/env';
import { logger } from '@/lib/logger/winston-logger';
import repl from 'node:repl';

// Guards
if (NODE_ENV === 'production')
  throw new Error('REPL is not allowed in production');

// Start REPL
(async () => {
  // Start the server
  const server = await startServer();

  // REPL setup
  const replServer = repl.start();
  replServer.context.app = app; // Load app logic
  replServer.context.server = server; // Load the running server

  // Exit REPL gracefully
  replServer.on('exit', () =>
    server.close(() => {
      logger.info('Server closed, exiting REPL');
      process.exit(0); // Exit explicitly on success
    }),
  );
})();
