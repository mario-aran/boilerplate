// WARNING: This file is used by a script in "package.json". Do not rename or move

import { handleNotFound } from '@/middleware/handle-not-found';
import { handleRouteError } from '@/middleware/handle-route-error';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import { router } from './router';

const app = express();

app.use(cors());
app.use(express.json()); // JSON payloads
app.use(passport.initialize());

// Router
app.use('/api', router);

// Handle route errors
app.use(handleNotFound); // Must be placed after all route definitions
app.use(handleRouteError); // Must be the last middleware

export { app };
