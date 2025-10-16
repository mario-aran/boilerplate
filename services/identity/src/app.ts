import cors from 'cors';
import express from 'express';
import { passportInit } from './features/auth/passport';
import { morganInit } from './lib/logger/morgan-init';
import { errorHandler } from './middleware/error-handler';
import { notFound } from './middleware/not-found';
import { routes } from './routes';

export const app = express();

app.use(morganInit);
app.use(cors());
app.use(express.json());
app.use(passportInit); // Must be placed after "express.json"
app.use(routes); // Must be placed after req/res middlewares
app.use(notFound); // Must be placed after routes
app.use(errorHandler); // Must be the placed last
