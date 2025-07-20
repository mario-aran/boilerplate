import cors from 'cors';
import express from 'express';
import { passport } from './lib/passport';
import { router } from './router';

const app = express();

app.use(cors());
app.use(express.json()); // Body parser
app.use(passport.initialize()); // Strategies, must be placed after all parsers
app.use(router); // Must be placed last

export { app };
