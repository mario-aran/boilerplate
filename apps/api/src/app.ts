import { handleNotFound } from '@/middleware/handle-not-found';
import { handleRouteError } from '@/middleware/handle-route-error';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { passport } from './lib/passport';
import { routes } from './routes';

const app = express();

app.use(cors()); // Cors
app.use(cookieParser()); // Cookies
app.use(express.json()); // JSON body

app.use(passport.initialize()); // Passport with all strategies

// Routes
app.use('/api', routes);

// Handle route errors
app.use(handleNotFound); // Must be placed after all route definitions
app.use(handleRouteError); // Must be the last middleware

export { app };
