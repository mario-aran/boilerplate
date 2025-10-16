import { QueueOptions } from 'bullmq';
import { queueClient } from './clients';

export const queueOptions: QueueOptions = {
  connection: queueClient,
  defaultJobOptions: {
    removeOnComplete: 1000,
    removeOnFail: 5000,
  },
};
