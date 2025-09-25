// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { testDbConnection } from '@/lib/drizzle/db';
import { bullMQConnection } from '@/lib/redis/bullmq-connection';
import { emailVerificationWorker } from './email-verification.worker';

(async () => {
  // Verify connections
  await testDbConnection();
  await bullMQConnection.verify();

  // Start workers
  emailVerificationWorker();
})();
