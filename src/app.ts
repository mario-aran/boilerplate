import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { passport } from './lib/passport';
import { router } from './router';

const app = express();

// Middleware definitions
app.use(cors());

// Router setup
app.use(cookieParser());
app.use(express.json()); // Body parser
app.use(passport.initialize()); // Passport strategies: must be placed after all request middleware
app.use('/', router); // Must be placed last

export { app };
