import { passport } from '@/lib/passport/strategies/passport';

export const authenticateJwt = passport.authenticate('jwt', { session: false });
