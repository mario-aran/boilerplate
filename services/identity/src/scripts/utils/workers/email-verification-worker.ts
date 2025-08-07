import { QUEUES } from '@/constants/queues';
import { emailService } from '@/features/email/email.service';
import { connection } from '@/lib/redis/connection';
import { Worker } from 'bullmq';
import { registerWorkerEvents } from './register-worker-events';

export const startEmailVerificationWorker = () => {
  // Start the worker
  const worker = new Worker(
    QUEUES.EMAIL_VERIFICATION,
    async (job) => {
      await emailService.sendEmailVerification(job.data);
    },
    { connection },
  );

  // Register events
  registerWorkerEvents(QUEUES.EMAIL_VERIFICATION, worker);
};
