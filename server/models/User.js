import { User as UserMapping } from '../models/mapping.js';
import AppError from '../errors/AppError.js';

class User {
  async getAll() {
    const users = await UserMapping.find({}, 'name lastVisit status createdAt');
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
    const lastVisit = this._getVisitDate();
    const user = await UserMapping.findOneAndUpdate({ email }, {lastVisit: {date: lastVisit.date}}, { returnDocument: 'after' });

    if (!user) {
      throw new Error('Пользователь не найдена в БД');
    }
    return user;
  }

  async create(data) {
    const { name, email, password } = data;
    const check = await UserMapping.findOne({ email });
    if (check) {
      throw new Error('Пользователь уже существует');
    }
    const lastVisit = this._getVisitDate();
    const status = this._setStatus(false);
    const user = await UserMapping.create({
      name,
      email,
      password,
      lastVisit,
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
    const users = await UserMapping.deleteMany({_id: id});

    if (!users) {
      throw new Error('Пользователь не найдена в БД');
    }

    return users;
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

  _setStatus(status) {
    return { blocked: status };
  }
}

export default new User();
