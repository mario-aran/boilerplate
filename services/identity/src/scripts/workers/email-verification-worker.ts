import { QUEUES } from '@/constants/queues';
import { emailService } from '@/features/email/email.service';
import { connection } from '@/lib/bullmq/connection';
import { Worker } from 'bullmq';
import { registerWorkerEvents } from './utils';

export const startEmailVerificationWorker = () => {
  // Start worker
  const worker = new Worker(
    QUEUES.EMAIL_VERIFICATION,
    async (job) => {
      await emailService.sendEmailVerification(job.data);
    },
    { connection },
  );

  // Events
  registerWorkerEvents(QUEUES.EMAIL_VERIFICATION, worker);
};
