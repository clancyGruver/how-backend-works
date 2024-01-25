import { db } from '../../db';
import { ITodoRepository } from './todo.repository.interface';

export const TodoFileRepository: ITodoRepository = {
  async findById(id) {
    const foundTodo = db.todo.find((todo) => todo.id === id);
    if (!foundTodo) {
      throw new Error(`Тудушка с id ${id} не найдена`);
    }
    return foundTodo;
  },

  async findMany(searchTerm) {
    let foundTodoList = db.todo;

    if (searchTerm) {
      const title = searchTerm.title?.toLowerCase();
      const description = searchTerm.description?.toLowerCase();
      const { active } = searchTerm;

      if (title) {
        foundTodoList = foundTodoList.filter((todo) => (
          todo.title.toLowerCase().includes(title)
        ));
      }
      if (description) {
        foundTodoList = foundTodoList.filter((todo) => (
          todo.description.toLowerCase().includes(description)
        ));
      }
      if (typeof active === 'boolean') {
        foundTodoList = foundTodoList.filter((todo) => (
          todo.active === active
        ));
      }
    }

    return foundTodoList;
  },

  async insert(todo) {
    const newTodo = { ...todo, id: +(new Date()) };
    db.todo.push(newTodo);

    return newTodo;
  },

  async update(id, params) {
    const foundTodo = db.todo.find((todo) => todo.id === id);

    if (!foundTodo) {
      throw new Error(`Тудушка с id ${id} не найдена`);
    }

    foundTodo.title = params.title;
    foundTodo.description = params.description;
    foundTodo.active = params.active;

    return foundTodo;
  },

  async delete(id) {
    const foundCourseIdx = db.todo.findIndex((todo) => todo.id === id);

    if (foundCourseIdx < 0) {
      throw new Error(`Тудушка с id ${id} не найдена`);
    }

    db.todo.splice(foundCourseIdx, 1);
  },
};
