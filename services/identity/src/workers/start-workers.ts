// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { QUEUES } from '@/constants/queues';
import { emailService } from '@/features/email/email.service';
import { EmailPayload } from '@/features/email/types';
import { checkWorkerConnection } from '@/lib/bullmq/clients';
import { checkDbConnection } from '@/lib/drizzle/db';
import { createWorker } from './utils/create-worker';

void (async () => {
  // Check connections
  await checkDbConnection();
  await checkWorkerConnection();

  // Start workers
  createWorker<EmailPayload>({
    name: QUEUES.EMAIL_VERIFICATION_EMAIL,
    processor: (job) => emailService.sendEmailVerification(job.data),
  });
})();
