import { User as UserMapping } from '../models/mapping.js';
import AppError from '../errors/AppError.js';

class User {
  async getAll() {
    const users = await UserMapping.find();
    return users;
  }

  async getOne(id) {
    const user = await UserMapping.findById(id);
    if (!user) {
      throw new Error('Пользователь не найдена в БД');
    }
    return user;
  }

  async getByEmail(email) {
    const visited = this._getVisitDate();
    const user = await UserMapping.findOneAndUpdate({ where: { email } }, visited, {returnDocument: 'after'});
    if (!user) {
      throw new Error('Пользователь не найдена в БД');
    }
    return user;
  }

  async create(data) {
    const { name, email, password } = data;
    const check = await UserMapping.findOne({ where: { email } });
    if (check) {
      throw new Error('Пользователь уже существует');
    }
    const visited = this._getVisitDate();
    const status = this._getStatus(false);
    const user = await UserMapping.create({
      name,
      email,
      password,
      visited,
      status,
    });
    return user;
  }

  async update(id, data) {
      const {
        email = user.email,
        password = user.password,
        name = user.name,
      } = data;
    const user = await UserMapping.findByIdAndUpdate(id, {name, email, password}, {returnDocument: 'after'});
    if (!user) {
      throw new Error('Пользователь не найдена в БД');
    }

    return user;
  }

  async delete(id) {
    const user = await UserMapping.findByIdAndDelete(id);
    if (!user) {
      throw new Error('Пользователь не найдена в БД');
    }

    return user;
  }

  async changeStatus(id) {
    const user = await UserMapping.findByIdAndUpdate(id, {status: !status}, {returnDocument: 'after'});
    if (!user) {
      throw new Error('Пользователь не найдена в БД');
    }

    return user;
  }

  _getVisitDate() {
    return { date: new Date() };
  }

  _getStatus(status) {
    return { blocked: status };
  }
}

export default new User();
