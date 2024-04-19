import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { HttpStatuses } from '../constants';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './httpError.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

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
