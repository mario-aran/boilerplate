import { GetUserResult } from '@/features/users/users.service';

declare global {
  namespace Express {
    // Disabled eslint: use empty interface to extend express types
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends GetUserResult {} // Add "req.user" type
  }
}
