import { logger } from '@/lib/logger/winston-logger';
import { workerClient } from '@/lib/redis/bullmq/clients';
import { Job, Worker } from 'bullmq';

export const createWorker = <T extends object>({
  name,
  processor,
}: {
  name: string;
  processor: (job: Job<T>) => Promise<unknown>;
}) => {
  const worker = new Worker(name, processor, { connection: workerClient });
  worker.on('completed', (job) =>
    logger.info(`${name} job ${String(job.id)} has completed`),
  );
  worker.on('failed', (job, err) =>
    logger.error(`${name} job ${String(job?.id)} has failed: ${err.message}`),
  );

  logger.info(`${name} worker started`);
  return worker;
};
