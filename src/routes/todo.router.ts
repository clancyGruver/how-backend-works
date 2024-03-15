import { Router } from 'express';
import { body, param } from 'express-validator';
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

todoRouter.get(
  '/:id',
  idValidation,
  inputValidationMiddleware,
);

todoRouter.post(
  '/',
  titleValidation,
  descriptionValidation,
  inputValidationMiddleware,
);

todoRouter.put(
  '/:id',
  titleValidation,
  descriptionValidation,
  activeValidation,
  idValidation,
  inputValidationMiddleware,
);
