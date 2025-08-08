// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { NODE_ENV } from '@/config/env';
import { logger } from '@/lib/logger/winston-logger';
import { app, startServer } from '@/server';
import repl from 'node:repl';

// Guards
if (NODE_ENV === 'production')
  throw new Error('REPL is not allowed in production');

// Utils
const startRepl = async () => {
  // Start the server
  const server = await startServer();

  // REPL setup
  const replServer = repl.start();
  replServer.context.app = app; // Load app logic
  replServer.context.server = server; // Load the server instance

  // Graceful shutdown
  replServer.on('exit', () =>
    server.close(() => {
      logger.info('Server closed, exiting REPL');
      process.exit(0); // Explicitly exit on success
    }),
  );
};

// Run the script
(async () => {
  await startRepl();
})();
