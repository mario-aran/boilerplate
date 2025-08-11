import { logger } from '@/lib/logger/winston-logger';
import { Worker } from 'bullmq';

export const registerWorkerEvents = (workerName: string, worker: Worker) => {
  logger.info(`${workerName} worker started`);

  // Events
  worker.on('completed', (job) =>
    logger.info(`${workerName} job ${job.id} has completed`),
  );

  worker.on('failed', (job, err) =>
    logger.error(`${workerName} job ${job?.id} has failed: ${err.message}`),
  );
};
