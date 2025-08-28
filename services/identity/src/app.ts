import cors from 'cors';
import express from 'express';
import { passportInit } from './features/auth/passport/passport-init';
import { morganInit } from './lib/logger/morgan-init';
import { errorHandler } from './middleware/error-handler';
import { notFound } from './middleware/not-found';
import { routes } from './routes';

export const app = express();

// Middlewares
app.use(morganInit);
app.use(cors());
app.use(express.json());
app.use(passportInit); // Must be placed after "express.json"
app.use(routes); // Must be placed after all but before error handler
app.use(notFound); // Must be placed after routes
app.use(errorHandler); // Must be the placed last
