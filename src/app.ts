import express from 'express';
import bodyParser from 'body-parser';
import { todoRouter } from './routes/todo.router';

const jsonBodyParser = bodyParser.json();

export const app = express();

app.use(jsonBodyParser);

app.use('/todo', todoRouter);
