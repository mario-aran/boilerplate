import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { passport } from './lib/passport';
import { router } from './router';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json()); // JSON body parser
app.use(passport.initialize()); // Custom passport strategies

app.use('/', router);

export { app };
