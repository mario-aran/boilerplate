// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { dbConnection } from '@/lib/drizzle/db-connection';
import { bullMQConnection } from '@/lib/redis/bullmq-connection';
import { EmailVerificationWorker } from './email-verification.worker';

(async () => {
  // Verify connections
  await dbConnection.verify();
  await bullMQConnection.verify();

  // Start the workers
  new EmailVerificationWorker();
})();
