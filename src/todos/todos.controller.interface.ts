import { Request, Response, NextFunction } from 'express';
import { TodoViewModel } from '../dto/todo.dto';
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from '../types';
import { TodoCreateDto } from './dto/todo.create.dto';
import { TodoUpdateDto } from './dto/todo.update.dto';

export interface ITodoController {
  getAll(
    req: Request,
    res: Response<TodoViewModel[]>,
    next: NextFunction,
  ): Promise<void>;

  getById(
    req: RequestWithParams<{ id: string }>,
    res:Response<TodoViewModel>,
    next: NextFunction,
  ): Promise<void>

  create(
    req: RequestWithBody<TodoCreateDto>,
    res: Response<TodoViewModel>,
    next: NextFunction,
  ): Promise<void>

  update(
    req: RequestWithParamsAndBody<{ id: string }, TodoUpdateDto>,
    res:Response<TodoViewModel>,
    next: NextFunction,
  ): Promise<void>

  delete(
    req: RequestWithParams<{ id: string }>,
    res:Response,
    next: NextFunction,): Promise<void>
}
