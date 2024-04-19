import { NextFunction, Request, Response } from 'express';
import { HttpStatuses } from '../constants';
import { LoggerService } from '../logger/logger.service';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './httpError.class';

export class ExceptionFilter implements IExceptionFilter {
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HTTPError) {
      this.logger.error(`[${err.context}] Ошибка ${err.statusCode} : ${err.message}`);
      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(err.message);
      res.status(HttpStatuses.INTERNAL_ERROR_500).send({ err: err.message });
    }
  }
}
