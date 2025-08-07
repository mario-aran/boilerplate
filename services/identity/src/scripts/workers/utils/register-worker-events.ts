import { logger } from '@/lib/logger/winston-logger';
import { Worker } from 'bullmq';

export const registerWorkerEvents = (workerName: string, worker: Worker) => {
  // Log startup
  logger.info(`${workerName} worker started`);

  // Register events
  worker.on('completed', (job) => {
    logger.info(`${job.id} has completed`);
  });

  worker.on('failed', (job, err) => {
    logger.error(`${job?.id} has failed with ${err.message}`);
  });
};
