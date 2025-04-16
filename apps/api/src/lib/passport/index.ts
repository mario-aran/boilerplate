import passport from 'passport';
import { jwtStrategy } from './jwt.strategy';

// Merge all strategies
passport.use(jwtStrategy);

export { passport };
