// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { checkDbConnection } from '@/lib/drizzle/db';
import { verificationEmailWorker } from './verification-email.worker';

void (async () => {
  // Check connections
  await checkDbConnection();

  // Start workers
  verificationEmailWorker();
})();
