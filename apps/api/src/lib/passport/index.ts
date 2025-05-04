import passport from 'passport';
import { jwtStrategy } from './strategies/jwt.strategy';

// Strategies
passport.use(jwtStrategy);

export { passport };
