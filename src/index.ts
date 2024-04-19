import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { LoggerService } from './logger/logger.service';
import { TodoController } from './todos/todos.controller';

async function bootstrap() {
  const logger = new LoggerService();

  const app = new App(
    logger,
    new TodoController(logger),
    new ExceptionFilter(logger),
  );

  await app.init();
}

bootstrap();
