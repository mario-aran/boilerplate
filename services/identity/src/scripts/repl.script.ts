// DO NOT RENAME OR MOVE THIS FILE — used by a script in "package.json"

import { NODE_ENV } from '@/config/env';
import { app, server } from '@/index';
import { logger } from '@/lib/logger/winston-logger';
import repl from 'node:repl';

// Guards
if (NODE_ENV === 'production')
  throw new Error('REPL is not allowed in production');

// Start REPL
const replServer = repl.start();
replServer.context.app = app; // Load app logic
replServer.context.server = server; // Run the app

// Exit REPL gracefully
replServer.on('exit', () =>
  server.close(() => {
    logger.info('Server closed, exiting REPL');
    process.exit(0); // Exit explicitly on success
  }),
);
