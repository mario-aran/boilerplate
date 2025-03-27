// WARNING: This file is executed by a script in "package.json". Don't rename or move it

import { SERVER_PORT } from '@/config/env';
import { errorHandler } from '@/middleware/error-handler';
import { notFound } from '@/middleware/not-found';
import express from 'express';
import { router } from './router';

const app = express();

// Router
app.use('/api', router);

// Middlewares
app.use(notFound); // Not found routes
app.use(errorHandler); // Centralized error handler: Must be the last middleware

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server running on port: ${SERVER_PORT}`);
});
