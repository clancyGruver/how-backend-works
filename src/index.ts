import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { TodoController } from './todos/todos.controller';

async function bootstrap() {
  const logger = new LoggerService();

  const app = new App(
    logger,
    new TodoController(logger),
  );

  await app.init();
}

bootstrap();
