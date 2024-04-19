import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TodoController } from './todos/todos.controller';
import { TYPES } from './types';
import { ITodoController } from './todos/todos.controller.interface';

interface IBootstrapReturnType {
  app: App;
  appContainer: Container;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
  bind<ITodoController>(TYPES.ITodoController).to(TodoController);
  bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturnType {
  const appContainer = new Container();
  appContainer.load(appBindings);

  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
