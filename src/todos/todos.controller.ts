import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { TodoViewModel } from '../dto/todo.dto';
import { TodoService } from '../domain/todo.service';
import { todoToTodoViewModel } from '../mapper/todo.mapper';
import { TodoCreateDto } from './dto/todo.create.dto';
import { TodoUpdateDto } from './dto/todo.update.dto';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { ITodoController } from './todos.controller.interface';

@injectable()
export class TodoController extends BaseController implements ITodoController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: '/', method: 'get', func: this.getAll },
      { path: '/:id', method: 'get', func: this.getById },
      { path: '/', method: 'post', func: this.create },
      { path: '/:id', method: 'put', func: this.update },
      { path: '/:id', method: 'delete', func: this.delete },
    ]);
  }

  async getAll(
    req: Request,
    res: Response<TodoViewModel[]>,
  ) {
    const todoList = await TodoService.findMany();
    this.ok(res, todoList.map(todoToTodoViewModel));
  }

  async getById(
    { params }: Request<{ id: string }>,
    res:Response<TodoViewModel>,
  ) {
    const paramId = +params.id;
    try {
      const todo = await TodoService.findById(paramId);
      this.ok(res, todoToTodoViewModel(todo));
    } catch (e) {
      this.notFound(res);
    }
  }

  async create(
    { body }: Request<{}, {}, TodoCreateDto>,
    res: Response<TodoViewModel>,
  ) {
    const todo = await TodoService.insert(body);

    this.created(res, todoToTodoViewModel(todo));
  }

  async update(
    { body, params }: Request<{ id: string }, {}, TodoUpdateDto>,
    res:Response<TodoViewModel>,
  ) {
    const id = +params.id;

    try {
      const todo = await TodoService.update(id, body);
      res.json(todoToTodoViewModel(todo));
    } catch {
      this.badRequest(res);
    }
  }

  async delete({ params }: Request<{ id: string }>, res:Response) {
    const id = +params.id;

    try {
      await TodoService.delete(id);
      this.noContent(res);
    } catch {
      this.badRequest(res);
    }
  }
}
