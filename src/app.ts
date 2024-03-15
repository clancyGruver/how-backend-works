import express, { type Express } from 'express';
import bodyParser from 'body-parser';
import { Server } from 'node:http';
import { LoggerService } from './logger/logger.service';
import { TodoController } from './todos/todos.controller';

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;
  todoController: TodoController;

  constructor(
    logger: LoggerService,
    todoController: TodoController,
  ) {
    this.app = express();
    this.port = 3000;
    this.logger = logger;
    this.todoController = todoController;
  }

  useRoutes() {
    this.app.use('/todo', this.todoController.router);
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
