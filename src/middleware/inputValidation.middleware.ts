import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { HttpStatuses } from '../constants';

export const inputValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(HttpStatuses.BAD_REQUEST_400).json({ errors: errors.array() });
  }

  next();
};
