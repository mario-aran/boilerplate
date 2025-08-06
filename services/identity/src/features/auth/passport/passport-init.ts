import passport from 'passport';
import { jwtStrategy } from './jwt-strategy';

// Strategies
passport.use(jwtStrategy);

export const passportInit = passport.initialize();
