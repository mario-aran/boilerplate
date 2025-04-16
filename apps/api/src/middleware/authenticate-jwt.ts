import { passport } from '@/lib/passport';

export const authenticateJwt = passport.authenticate('jwt', { session: false });
