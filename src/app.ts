import express, { type Express } from 'express';
import bodyParser from 'body-parser';
import { Server } from 'node:http';
import { todoRouter } from './routes/todo.router';
import { LoggerService } from './logger/logger.service';

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;

  constructor(
    logger: LoggerService,
  ) {
    this.app = express();
    this.port = 3000;
    this.logger = logger;
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
    this.logger.log(`Server started on port ${this.port}`);
  }
}
