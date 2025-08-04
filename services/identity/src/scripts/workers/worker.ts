import { QUEUES } from '@/constants/queues';
import { connection } from '@/lib/bullmq/connection';
import { Worker } from 'bullmq';

const worker = new Worker(
  QUEUES.EMAIL_VERIFICATION,
  async (job) => {
    console.log(job.data);
  },
  { connection },
);

worker.on('completed', (job) => {
  console.log(`${job.id} has completed`);
});

worker.on('failed', (job, err) => {
  console.log(`${job?.id} has failed with ${err.message}`);
});
