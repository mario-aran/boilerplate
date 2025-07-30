import cors from 'cors';
import express from 'express';
import { passportInit } from './features/auth/passport';
import { router } from './router';

const app = express();

app.use(cors());
app.use(express.json()); // Body parser
app.use(passportInit); // Must be placed after all parsers
app.use(router); // Must be placed last

export { app };
