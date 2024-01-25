import { Response, Router } from 'express';
import { body, param } from 'express-validator';
import { HTTP_STATUSES } from '../constants';
import {
  RequestWithQuery, RequestWithParams, RequestWithBody, RequestWithParamsAndBody,
} from '../types';
import {
  RequestGetTodo, RequestPostTodo, RequestPutTodo, TodoParamsIdModel, TodoViewModel,
} from '../dto/todo.dto';
import { todoToTodoViewModel } from '../mapper/todo.mapper';
import { TodoService } from '../domain/todo.service';
import { inputValidationMiddleware } from '../middleware/inputValidation.middleware';

export const todoRouter = Router();

const titleValidation = body('title')
  .exists()
  .trim()
  .isLength({ min: 3, max: 40 })
  .withMessage('Длина тайтла должна быть от 3 до 40 символов');
const descriptionValidation = body('description')
  .exists()
  .trim()
  .isLength({ min: 0, max: 120 })
  .withMessage('Длина описания должна быть до 120 символов');
const activeValidation = body('active')
  .exists()
  .withMessage('поле active должно присутствовать');
const idValidation = param('id').exists().withMessage('Не передан идентификатор');

todoRouter.get('/', async (req: RequestWithQuery<RequestGetTodo>, res: Response<TodoViewModel[]>): Promise<void> => {
  const todoList = await TodoService.findMany();
  res.json(todoList.map(todoToTodoViewModel));
});

todoRouter.get(
  '/:id',
  idValidation,
  inputValidationMiddleware,
  async (req: RequestWithParams<TodoParamsIdModel>, res:Response<TodoViewModel>): Promise<void> => {
    const paramId = +req.params.id;
    try {
      const todo = await TodoService.findById(paramId);
      res.json(todoToTodoViewModel(todo));
    } catch (e) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
  },
);

todoRouter.post(
  '/',
  titleValidation,
  descriptionValidation,
  inputValidationMiddleware,
  async (req: RequestWithBody<RequestPostTodo>, res: Response<TodoViewModel>): Promise<void> => {
    const todo = await TodoService.insert(req.body);

    res
      .status(HTTP_STATUSES.CREATED_201)
      .json(todoToTodoViewModel(todo));
  },
);

todoRouter.put(
  '/:id',
  titleValidation,
  descriptionValidation,
  activeValidation,
  idValidation,
  inputValidationMiddleware,
  async (
    req: RequestWithParamsAndBody<TodoParamsIdModel, RequestPutTodo>,
    res:Response<TodoViewModel>,
  ): Promise<void> => {
    const id = +req.params.id;

    try {
      const todo = await TodoService.update(id, req.body);
      res.json(todoToTodoViewModel(todo));
    } catch {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    }
  },
);

todoRouter.delete('/:id', async (req: RequestWithParams<TodoParamsIdModel>, res:Response): Promise<void> => {
  const id = +req.params.id;

  try {
    await TodoService.delete(id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  } catch {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
  }
});
