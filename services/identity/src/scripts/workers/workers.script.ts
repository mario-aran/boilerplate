// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { QUEUES } from '@/constants/queues';
import { emailService } from '@/features/email/email.service';
import { EmailPayload } from '@/features/email/types';
import { checkDbConnection } from '@/lib/drizzle/db';
import { Job } from 'bullmq';
import { createWorker } from './utils/create-worker';

void (async () => {
  // Check connections
  await checkDbConnection();

  // Start workers
  createWorker({
    name: QUEUES.EMAIL_VERIFICATION_EMAIL,
    processor: (job: Job<EmailPayload>) =>
      emailService.sendEmailVerification(job.data),
  });
})();
