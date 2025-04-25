import passport from 'passport';
import { jwtStrategy } from './strategies/jwt.strategy';

// Merge all strategies
passport.use(jwtStrategy);

export { passport };
