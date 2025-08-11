import { logger } from '@/lib/logger/winston-logger';
import { Worker } from 'bullmq';

export const closeWorker = async (workerName: string, worker: Worker) => {
  try {
    await worker.close();
    logger.info(`${workerName} worker closed successfully`);
  } catch (err) {
    logger.error(`Error closing ${workerName} worker: ${err}`);
  }
};
