import { UsersServiceGetResult } from '@/features/users/users.service';

declare global {
  namespace Express {
    // Disabled eslint rule: empty interface required for express type augmentation
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends UsersServiceGetResult {} // Types "req.user"
  }
}
