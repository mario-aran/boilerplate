import passport from 'passport';
import { jwtStrategy } from './jwt.strategy';

// Strategies
passport.use(jwtStrategy);

// Middleware
export const passportInit = passport.initialize();
