import { QUEUES } from '@/constants/queues';
import { emailService } from '@/features/email/email.service';
import { connection } from '@/lib/bullmq/connection';
import { logger } from '@/lib/winston/logger';
import { Worker } from 'bullmq';

export const startEmailVerificationWorker = () => {
  // Start worker
  const worker = new Worker(
    QUEUES.EMAIL_VERIFICATION,
    async (job) => {
      await emailService.sendEmailVerification(job.data);
    },
    { connection },
  );
  logger.info('Email verification worker started');

  // Events
  worker.on('completed', (job) => {
    logger.info(`${job.id} has completed`);
  });

  worker.on('failed', (job, err) => {
    logger.error(`${job?.id} has failed with ${err.message}`);
  });
};
