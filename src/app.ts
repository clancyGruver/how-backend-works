import express, { type Express } from 'express';
import bodyParser from 'body-parser';
import { Server } from 'node:http';
import { inject, injectable } from 'inversify';
import { TodoController } from './todos/todos.controller';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import 'reflect-metadata';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.ITodoController) private todoController: TodoController,
    @inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
  ) {
    this.app = express();
    this.port = 3000;
  }

  useRoutes() {
    this.app.use('/todo', this.todoController.router);
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  useMiddleware(): void {
    const jsonBodyParser = bodyParser.json();
    this.app.use(jsonBodyParser);
  }

  public async init() {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();

    this.server = this.app.listen(this.port);
    this.logger.log(`Server started on port ${this.port}`);
  }
}
