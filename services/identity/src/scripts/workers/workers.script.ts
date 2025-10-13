// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { testDbConnection } from '@/lib/drizzle/db';
import { bullMQConnection } from '@/lib/redis/bullmq-connection';
import { verificationEmailWorker } from './verification-email.worker';

(async () => {
  // Verify connections
  await testDbConnection();
  await bullMQConnection.verify();

  // Start workers
  verificationEmailWorker();
})();
