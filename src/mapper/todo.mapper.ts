import { ITodo } from '../db/Todo.interface';
import { TodoViewModel } from '../dto/todo.dto';

export const todoToTodoViewModel = (todo: ITodo): TodoViewModel => ({
  id: todo.id,
  title: todo.title,
  description: todo.description,
  active: todo.active,
});
