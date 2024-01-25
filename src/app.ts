import express from 'express';
import bodyParser from 'body-parser';
import { coursesRouter } from './routes/courses.router';

const jsonBodyParser = bodyParser.json();

export const app = express();

app.use(jsonBodyParser);

app.use('/courses', coursesRouter);
