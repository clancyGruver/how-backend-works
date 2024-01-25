import { ITodo } from '../../db/Todo.interface';
import { RequestPutTodo } from '../../dto/todo.dto';

export interface ISearchTerm extends Partial<Pick<ITodo, 'active' | 'description' | 'title'>> {}
export interface IInsertTodo extends Omit<ITodo, 'id'> {}

export interface ITodoRepository {
  findById: (id: number) => Promise<ITodo | never>;
  findMany: (searchTerm?: ISearchTerm) => Promise<ITodo[]>;
  insert: (todo: IInsertTodo) => Promise<ITodo | never>;
  update: (id: number, params: RequestPutTodo) => Promise<ITodo | never>;
  delete: (id: number) => Promise<void | never>;
}
