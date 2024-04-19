import { injectable } from 'inversify';
import { Response, Router } from 'express';
import { ExpressReturnType, IControllerRoute } from './route.interface';
import { HttpStatuses } from '../constants';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: ILogger) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: HttpStatuses, message: T): ExpressReturnType {
    res.type('application/json');
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T): ExpressReturnType {
    return this.send<T>(res, HttpStatuses.OK_200, message);
  }

  public created<T>(res: Response, message?: T): ExpressReturnType {
    return message
      ? this.send(res, HttpStatuses.CREATED_201, message)
      : res.sendStatus(HttpStatuses.CREATED_201);
  }

  public notFound(res: Response): ExpressReturnType {
    return res.sendStatus(HttpStatuses.NOT_FOUND_404);
  }

  public badRequest(res: Response): ExpressReturnType {
    return res.sendStatus(HttpStatuses.BAD_REQUEST_400);
  }

  public noContent(res: Response): ExpressReturnType {
    return res.sendStatus(HttpStatuses.NO_CONTENT_204);
  }

  protected bindRoutes(routes: IControllerRoute[]): void {
    routes.forEach((route) => {
      this.logger.log(`[${route.method}] ${route.path}`);
      const handler = route.func.bind(this);
      this.router[route.method](route.path, handler);
    });
  }
}
