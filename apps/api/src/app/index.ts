// WARNING: This file is used by a script in "package.json". Do not rename or move

import { SERVER_PORT } from '@/config/env';
import { errorHandler } from '@/middleware/error-handler';
import { notFound } from '@/middleware/not-found';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import { router } from './router';

const app = express();

// Middlewares
app.use(express.json()); // JSON payloads
app.use(cors());
app.use(passport.initialize());

// Router
app.use('/api', router);
app.use(notFound); // Not found routes: Must be put after all routes

// Error handler: Must be the last middleware
app.use(errorHandler);

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server running on port: ${SERVER_PORT}`);
});
