import { ITodo } from '../db/Todo.interface';
import { RequestPostTodo, RequestPutTodo } from '../dto/todo.dto';
import { ISearchTerm } from '../repository/todo/Todo.repository.interface';

export interface ITodoService {
  findById: (id: number) => Promise<ITodo | never>;
  findMany: (searchTerm?: ISearchTerm) => Promise<ITodo[]>;
  insert: (todo: RequestPostTodo) => Promise<ITodo | never>;
  update: (id: number, params: RequestPutTodo) => Promise<ITodo | never>;
  delete: (id: number) => Promise<void | never>;
}
