import { QUEUES } from '@/constants/queues';
import { connection } from '@/lib/bullmq/connection';
import { Queue } from 'bullmq';
import { EmailVerificationProps } from './types';

class EmailQueueService {
  private emailVerificationQueue = new Queue(QUEUES.EMAIL_VERIFICATION, {
    connection,
  });

  public enqueueEmailVerification = async (props: EmailVerificationProps) => {
    await this.emailVerificationQueue.add(QUEUES.EMAIL_VERIFICATION, props);
  };
}

export const emailQueueService = new EmailQueueService();
