import { workerClient } from '@/lib/bullmq/clients';
import { logger } from '@/lib/logger/winston-logger';
import { Job, Worker } from 'bullmq';

interface CreateWorkerProps {
  name: string;
  processor: (job: Job) => Promise<unknown>;
}

export const createWorker = ({ name, processor }: CreateWorkerProps) => {
  // Start worker
  const worker = new Worker(name, processor, {
    connection: workerClient,
  });
  worker.on('completed', (job) =>
    logger.info(`${name} job ${job.id} has completed`),
  );
  worker.on('failed', (job, err) =>
    logger.error(`${name} job ${job?.id} has failed: ${err.message}`),
  );

  // Return initialized worker
  logger.info(`${name} worker started`);
  return worker;
};
