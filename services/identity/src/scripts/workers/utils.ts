import { logger } from '@/lib/logger/winston-logger';
import { bullMQConnection } from '@/lib/redis/bullmq-connection';
import { Processor, Worker } from 'bullmq';

interface CreateWorkerProps {
  name: string;
  processor: Processor;
}

export const createWorker = ({ name, processor }: CreateWorkerProps) => {
  // Start worker
  const worker = new Worker(name, processor, {
    connection: bullMQConnection.connection,
  });

  // Add Worker events
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
