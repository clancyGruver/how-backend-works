import { ITodo } from '../db/Todo.interface';
import { TodoViewModel } from '../dto/todo.dto';

export const todoToTodoViewModel = (course: ITodo): TodoViewModel => ({
  id: course.id,
  title: course.title,
  description: course.description,
  active: course.active,
});
