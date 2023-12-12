import { User as UserMapping } from '../models/mapping.js';
import AppError from '../errors/AppError.js';

const errorMessage = 'User not found in BD';

class User {
  async getAll() {
    const users = await UserMapping.find({}, 'name lastVisit status createdAt');
    return users;
  }

  async getOne(id) {
    const user = await UserMapping.findById(id);
    if (!user) {
      throw new Error(errorMessage);
    }
    return user;
  }

  async getByEmail(email) {
    const lastVisit = this._getVisitDate();
    const user = await UserMapping.findOneAndUpdate(
      { email },
      { lastVisit: { date: lastVisit.date } },
      { returnDocument: 'after' }
    );

    if (!user) {
      throw new Error(errorMessage);
    }

    if (user.status.blocked) {
      throw new Error('User is blocked');
    }
    return user;
  }

  async create(data) {
    const { name, email, password } = data;
    const check = await UserMapping.findOne({ email });
    if (check) {
      throw new Error('User already exists');
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

  async delete(_id) {
    const users = await UserMapping.deleteMany({ _id });

    if (!users) {
      throw new Error(errorMessage);
    }

    return users;
  }

  async changeStatus(id) {
    id.forEach(async (el) => {
      const user = await UserMapping.findById(el);

      await UserMapping.findByIdAndUpdate(
        el,
        { status: { blocked: !user.status.blocked } },
        { returnDocument: 'after' }
      );

    });

    const users = await UserMapping.find({_id: id}, '_id')

    if (!users.length) {
      throw new Error(errorMessage);
    }

    return users;
  }

  _getVisitDate() {
    return { date: new Date() };
  }

  _setStatus(status) {
    return { blocked: status };
  }
}

export default new User();
