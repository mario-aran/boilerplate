// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { testDbConnection } from '@/lib/drizzle/db';
import { verificationEmailWorker } from './verification-email.worker';

(async () => {
  // Verify connections
  await testDbConnection();

  // Start workers
  verificationEmailWorker();
})();
