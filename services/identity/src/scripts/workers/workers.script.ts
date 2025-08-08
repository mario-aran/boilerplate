// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { startEmailVerificationWorker } from './utils/email-verification-worker';

// Register startup functions
const emailVerificationWorker = startEmailVerificationWorker();

// Graceful shutdown
const shutdown = async () => {
  // Close workers
  await emailVerificationWorker.close();

  // Explicitly exit on success
  process.exit(0);
};

process.on('SIGINT', shutdown); // User interrupt signal
process.on('SIGTERM', shutdown); // System termination signal
