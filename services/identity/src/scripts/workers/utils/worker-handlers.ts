import { logger } from '@/lib/logger/winston-logger';
import { Worker } from 'bullmq';

export const registerWorkerEvents = (queueName: string, worker: Worker) => {
  logger.info(`${queueName} worker started`);

  worker.on('completed', (job) =>
    logger.info(`${queueName} job ${job.id} has completed`),
  );

  worker.on('failed', (job, err) =>
    logger.error(`${queueName} job ${job?.id} has failed: ${err.message}`),
  );
};

export const closeWorker = async (queueName: string, worker: Worker) => {
  try {
    await worker.close();
    logger.info(`${queueName} worker closed successfully`);
  } catch (err) {
    logger.error(`Error closing ${queueName} worker: ${err}`);
  }
};
