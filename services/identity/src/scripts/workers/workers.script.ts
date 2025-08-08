// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { startEmailVerificationWorker } from './utils/email-verification-worker';

// Register startup functions
const emailVerificationWorker = startEmailVerificationWorker();

// Shutdown
const gracefulShutdown = async () => {
  // Close workers
  await emailVerificationWorker.close();

  process.exit(0); // Explicitly exit on success
};

process.on('SIGINT', gracefulShutdown); // User interrupt signal
process.on('SIGTERM', gracefulShutdown); // System termination signal
