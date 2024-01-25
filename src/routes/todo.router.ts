import { Response, Router } from 'express';
import { HTTP_STATUSES } from '../constants';
import {
  RequestWithQuery, RequestWithParams, RequestWithBody, RequestWithParamsAndBody,
} from '../types';
import {
  RequestGetTodo, RequestPostTodo, RequestPutTodo, TodoParamsIdModel, TodoViewModel,
} from '../dto/todo.dto';
import { todoToTodoViewModel } from '../mapper/todo.mapper';
import { TodoService } from '../domain/todo.service';

export const todoRouter = Router();

todoRouter.get('/', async (req: RequestWithQuery<RequestGetTodo>, res: Response<TodoViewModel[]>): Promise<void> => {
  const todoList = await TodoService.findMany();
  res.json(todoList.map(todoToTodoViewModel));
});

todoRouter.get('/:id', async (req: RequestWithParams<TodoParamsIdModel>, res:Response<TodoViewModel>): Promise<void> => {
  const paramId = +req.params.id;
  try {
    const todo = await TodoService.findById(paramId);
    res.json(todoToTodoViewModel(todo));
  } catch (e) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
});

todoRouter.post('/', async (req: RequestWithBody<RequestPostTodo>, res: Response<TodoViewModel>): Promise<void> => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  const todo = await TodoService.insert({ title, description });

  res
    .status(HTTP_STATUSES.CREATED_201)
    .json(todoToTodoViewModel(todo));
});

todoRouter.put('/:id', async (req: RequestWithParamsAndBody<TodoParamsIdModel, RequestPutTodo>, res:Response<TodoViewModel>): Promise<void> => {
  const { title, description, active } = req.body;
  const id = +req.params.id;

  if (!title || !description || !active) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  try {
    const todo = await TodoService.update(id, { title, description, active });
    res.json(todoToTodoViewModel(todo));
  } catch {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
  }
});

todoRouter.delete('/:id', async (req: RequestWithParams<TodoParamsIdModel>, res:Response): Promise<void> => {
  const id = +req.params.id;

  try {
    await TodoService.delete(id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  } catch {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
  }
});
