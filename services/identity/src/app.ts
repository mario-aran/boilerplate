import cors from 'cors';
import express from 'express';
import { morganInit } from './lib/logger/morgan';
import { passportInit } from './lib/passport';
import { errorHandler } from './middleware/error-handler';
import { notFound } from './middleware/not-found';
import { routes } from './routes';

export const app = express();

app.use(morganInit);
app.use(cors());
app.use(express.json()); // Body parser
app.use(passportInit); // Must be placed after parsers
app.use(routes); // Must be placed after req middlewares
app.use(notFound); // Must be placed after routes
app.use(errorHandler); // Must be the placed last
