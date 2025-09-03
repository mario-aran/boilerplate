import { QUEUES } from '@/constants/queues';
import { Queue } from 'bullmq';
import { EmailVerificationProps } from './types';

// Types
interface EmailQueueServiceProps {
  emailVerificationQueue: Queue;
}

export class EmailQueueService {
  private readonly emailVerificationQueue: Queue;

  constructor({ emailVerificationQueue }: EmailQueueServiceProps) {
    this.emailVerificationQueue = emailVerificationQueue;
  }

  async queueEmailVerification(props: EmailVerificationProps) {
    await this.emailVerificationQueue.add(QUEUES.EMAIL_VERIFICATION, props);
  }
}
