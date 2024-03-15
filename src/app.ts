import express, { type Express } from 'express';
import bodyParser from 'body-parser';
import { Server } from 'node:http';
import { todoRouter } from './routes/todo.router';

export class App {
  app: Express;

  server: Server;

  port: number;

  constructor() {
    this.app = express();
    this.port = 3000;
  }

  useRoutes() {
    this.app.use('/todo', todoRouter);
  }

  useMiddleware(): void {
    const jsonBodyParser = bodyParser.json();
    this.app.use(jsonBodyParser);
  }

  public async init() {
    this.useRoutes();

    this.server = this.app.listen(this.port);
    console.log(`Server started on port ${this.port}`);
  }
}
