import { handleNotFound } from '@/middleware/handle-not-found';
import { handleRouteError } from '@/middleware/handle-route-error';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(passport.initialize());
app.use(express.json()); // JSON payloads

// Routes
app.use('/api', routes);

// Handle route errors
app.use(handleNotFound); // Must be placed after all route definitions
app.use(handleRouteError); // Must be the last middleware

export { app };
