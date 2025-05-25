import cors from 'cors';
import express from 'express';
import { passport } from './lib/passport';
import { router } from './router';

const app = express();

// Middleware definitions
app.use(cors());

// Router
app.use(express.json()); // Body parser
app.use(passport.initialize()); // "passport": strategies must be placed after all request middleware
app.use('/', router); // Must be placed last

export { app };
