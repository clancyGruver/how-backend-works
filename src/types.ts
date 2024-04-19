import { Request } from 'express';

export const TYPES = {
  Application: Symbol.for('Application'),
  ILogger: Symbol.for('ILogger'),
  ITodoController: Symbol.for('ITodoController'),
  IExceptionFilter: Symbol.for('IExceptionFilter'),
};

export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithQuery<T> = Request<{}, {}, {}, T>;
export type RequestWithParams<T> = Request<T>;
export type RequestWithParamsAndBody<T, U> = Request<T, {}, U>;
