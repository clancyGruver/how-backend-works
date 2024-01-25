import { ITodo } from '../db/Todo.interface';

export type TodoViewModel = Pick<ITodo, 'id' | 'title' | 'active' | 'description'>;
export type TodoParamsIdModel = Pick<ITodo, 'id'>;
export type RequestGetTodo = Pick<ITodo, 'title'>;
export type RequestPostTodo = Pick<ITodo, 'title' | 'description'>;
export type RequestPutTodo = Pick<ITodo, 'title' | 'description' | 'active'>;
