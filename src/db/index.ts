import { ITodo } from './Todo.interface';
import { todoList } from './todoList';

export type DbType = {
  todo: ITodo[];
};

export const db: DbType = {
  todo: todoList,
};
