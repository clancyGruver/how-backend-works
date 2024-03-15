import { Response } from 'express';
import { BaseController } from '../common/base.controller';
import {
  RequestGetTodos, RequestPostTodo, RequestPutTodo, TodoParamsIdModel, TodoViewModel,
} from '../dto/todo.dto';
import { LoggerService } from '../logger/logger.service';
import {
  RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery,
} from '../types';
import { TodoService } from '../domain/todo.service';
import { todoToTodoViewModel } from '../mapper/todo.mapper';

export class TodoController extends BaseController {
  constructor(loggerService: LoggerService) {
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
    req: RequestWithQuery<RequestGetTodos>,
    res: Response<TodoViewModel[]>,
  ) {
    const todoList = await TodoService.findMany();
    this.ok(res, todoList.map(todoToTodoViewModel));
  }

  async getById(
    req: RequestWithParams<TodoParamsIdModel>,
    res:Response<TodoViewModel>,
  ) {
    const paramId = +req.params.id;
    try {
      const todo = await TodoService.findById(paramId);
      this.ok(res, todoToTodoViewModel(todo));
    } catch (e) {
      this.notFound(res);
    }
  }

  async create(
    req: RequestWithBody<RequestPostTodo>,
    res: Response<TodoViewModel>,
  ) {
    const todo = await TodoService.insert(req.body);

    this.created(res, todoToTodoViewModel(todo));
  }

  async update(
    req: RequestWithParamsAndBody<TodoParamsIdModel, RequestPutTodo>,
    res:Response<TodoViewModel>,
  ) {
    const id = +req.params.id;

    try {
      const todo = await TodoService.update(id, req.body);
      res.json(todoToTodoViewModel(todo));
    } catch {
      this.badRequest(res);
    }
  }

  async delete(req: RequestWithParams<TodoParamsIdModel>, res:Response) {
    const id = +req.params.id;

    try {
      await TodoService.delete(id);
      this.noContent(res);
    } catch {
      this.badRequest(res);
    }
  }
}
