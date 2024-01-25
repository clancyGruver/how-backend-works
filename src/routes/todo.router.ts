import { Response, Router } from 'express';
import { HTTP_STATUSES } from '../constants';
import {
  RequestWithQuery, RequestWithParams, RequestWithBody, RequestWithParamsAndBody,
} from '../types';
import {
  RequestGetTodo, RequestPostTodo, RequestPutTodo, TodoParamsIdModel, TodoViewModel,
} from '../models/todo.model';
import { db } from '../db';

export const todoRouter = Router();

todoRouter.get('/', (req: RequestWithQuery<RequestGetTodo>, res: Response<TodoViewModel[]>): void => {
  let result = db.todo;

  if (req.query.title) {
    const queryTitle = req.query.title.toLowerCase();
    result = result.filter(({ title }) => title.toLowerCase().includes(queryTitle));
  }
  res.json(result);
});

todoRouter.get('/:id', (req: RequestWithParams<TodoParamsIdModel>, res:Response<TodoViewModel>): void => {
  const paramId = +req.params.id;
  const todo = db.todo.find(({ id }) => id === paramId);

  if (!todo) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  res.json(todo);
});

todoRouter.post('/', (req: RequestWithBody<RequestPostTodo>, res: Response<TodoViewModel>): void => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  const todo = {
    id: +(new Date()),
    title,
    description,
    active: true,
  };

  db.todo.push(todo);

  res
    .status(HTTP_STATUSES.CREATED_201)
    .json(todo);
});

todoRouter.put('/:id', (req: RequestWithParamsAndBody<TodoParamsIdModel, RequestPutTodo>, res:Response<TodoViewModel>) => {
  const { title, description, active } = req.body;
  const paramId = +req.params.id;

  if (!title || !description || !active) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  const todo = db.todo.find(({ id }) => id === paramId);

  if (!todo) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  todo.active = active;
  todo.title = title;
  todo.description = description;

  res.json(todo);
});

todoRouter.delete('/:id', (req: RequestWithParams<TodoParamsIdModel>, res:Response) => {
  const paramId = +req.params.id;

  const todoIdx = db.todo.findIndex(({ id }) => id === paramId);

  if (todoIdx === -1) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
  }

  db.todo.splice(todoIdx, 1);

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
