// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { verifyPool } from '@/lib/drizzle/db';
import { bullMQConnection } from '@/lib/redis/bullmq-connection';
import { emailVerificationWorker } from './email-verification.worker';

(async () => {
  // Verify connections
  await verifyPool();
  await bullMQConnection.verify();

  // Start workers
  emailVerificationWorker();
})();
