import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError.js';

const makeJwt = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class User {
  async signup(req, res, next) {
    const { email, password, name } = req.body;
    try {
      if (!email || !password) {
        throw new Error('Пустой имя, email или пароль');
      }
      const hash = await bcrypt.hash(password, 5);
      const user = await UserModel.create({ name, email, password: hash });
      const token = makeJwt(user.id, user.email);
      return res.json({ token });
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.getByEmail(email);
      let compare = bcrypt.compareSync(password, user.password);
      if (!compare) {
        throw new Error('Указан неверный пароль');
      }
      const token = makeJwt(user.id, user.email);
      return res.json({ token });
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async check(req, res, next) {
    const {id, email} = req.auth;
    const token = makeJwt(id, email);

    if (token) {
      await UserModel.getByEmail(email);
    }
    return res.json({ token });
  }

  async getAll(req, res, next) {
    try {
      const users = await UserModel.getAll();
      res.json(users);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Не указан id пользователя');
      }
      const user = await UserModel.getOne(req.params.id);
      res.json(user);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    const { email, password, name } = req.body;
    try {
      if (!email || !password || !name) {
        throw new Error('Пустой имя, email или пароль');
      }

      const hash = await bcrypt.hash(password, 5);
      const user = await UserModel.create({ name, email, password: hash });
      res.json(user);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Не указан id пользователя');
      }
      let { name, email, password } = req.body;

      if (password) {
        password = await bcrypt.hash(password, 5);
      }
      const user = await UserModel.update(req.params.id, {
        name,
        email,
        password,
      });
      res.json(user);
    } catch (e) {
      next(AppError.badRequest(e.message + 12));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.body;
      if (!id.length) {
        throw new Error('Не указаны id пользователей');
      }
      const users = id.reduce(async (acc, el) => {
        const user = await UserModel.delete(el);
        acc.push(user);

        return acc;
      });

      res.json(users);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async changeStatus(req, res, next) {
    try {
      const { id } = req.body;
      if (!id.length) {
        throw new Error('Не указаны id пользователей');
      }
      const users = id.reduce(async (acc, el) => {
        const user = await UserModel.changeStatus(el);
        acc.push(user);

        return acc;
      });

      res.json(users);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new User();
