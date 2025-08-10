import { QUEUES } from '@/constants/queues';
import { emailService } from '@/features/email/email.service';
import { bullMQConnection } from '@/lib/redis/bullmq-connection';
import { Worker } from 'bullmq';
import { registerWorkerEvents } from './register-worker-events';

export const startEmailVerificationWorker = () => {
  const worker = new Worker(
    QUEUES.EMAIL_VERIFICATION,
    async (job) => {
      await emailService.sendEmailVerification(job.data);
    },
    { connection: bullMQConnection.connection },
  );

  // Events
  registerWorkerEvents(QUEUES.EMAIL_VERIFICATION, worker);

  return worker;
};
