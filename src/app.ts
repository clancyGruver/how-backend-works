import express, { type Express } from 'express';
import bodyParser from 'body-parser';
import { Server } from 'node:http';
import { LoggerService } from './logger/logger.service';
import { TodoController } from './todos/todos.controller';
import { IExceptionFilter } from './errors/exception.filter.interface';

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;
  todoController: TodoController;
  exceptionFilter: IExceptionFilter;

  constructor(
    logger: LoggerService,
    todoController: TodoController,
    exceptionFilter: IExceptionFilter,
  ) {
    this.app = express();
    this.port = 3000;
    this.logger = logger;
    this.todoController = todoController;
    this.exceptionFilter = exceptionFilter;
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
