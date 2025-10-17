import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { passportInit } from './features/auth/passport';
import { morganInit } from './lib/logger/morgan-init';
import { errorHandler } from './middleware/error-handler';
import { notFound } from './middleware/not-found';
import { routes } from './routes';

export const app = express();

// ---------------------------
// SYSTEM
// ---------------------------

app.use(morganInit);
app.use(cors());

// ---------------------------
// PARSERS
// ---------------------------

app.use(cookieParser());
app.use(express.json()); // Body parser

// ---------------------------
// AUTHENTICATION
// ---------------------------

app.use(passportInit); // Must be placed after parsers

// ---------------------------
// ROUTING
// ---------------------------

app.use(routes); // Must be placed after req middlewares
app.use(notFound); // Must be placed after routes
app.use(errorHandler); // Must be the placed last
