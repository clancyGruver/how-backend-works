import { randomBytes, pbkdf2 } from 'crypto';
import { TodoFileRepository } from '../repository/todo/TodoFile.repository';
import { ITodoService } from './todo.service.interface';

const setHash = (): Promise<string> => {
  const salt = randomBytes(16).toString('hex');

  return new Promise((res, rej) => {
    pbkdf2(new Date().toString(), salt, 1000, 64, 'sha512', (err, derivedKey) => {
      if (err) rej(err);
      res(derivedKey.toString('hex'));
    });
  });
};

export const TodoService: ITodoService = {
  async findById(id) {
    return TodoFileRepository.findById(id);
  },
  async findMany(searchTerm) {
    return TodoFileRepository.findMany(searchTerm);
  },
  async insert({ title, description }) {
    const newTodo = {
      title,
      description,
      active: true,
      secret: await setHash(),
    };

    return TodoFileRepository.insert(newTodo);
  },
  async update(id, { title, description, active }) {
    return TodoFileRepository.update(id, { title, description, active });
  },
  async delete(id) {
    return TodoFileRepository.delete(id);
  },
};
