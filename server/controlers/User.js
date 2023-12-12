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
        throw new Error('Empty name, email or password');
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
        throw new Error('Incorrect password ');
      }
      const token = makeJwt(user.id, user.email);
      return res.json({ token });
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async check(req, res, next) {
    try {
      const { id, email } = req.auth;
      const token = makeJwt(id, email);

      if (token) {
        await UserModel.getByEmail(email);
      }
      return res.json({ token });
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const users = await UserModel.getAll();
      res.json(users);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.body;

      if (!id.length) {
        throw new Error('User IDs not specified');
      }
      const users = await UserModel.delete(id);

      res.json(users);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async changeStatus(req, res, next) {
    try {
      const { id } = req.body;
      if (!id.length) {
        throw new Error('User IDs not specified');
      }
      const users = await UserModel.changeStatus(id);

      res.json(users);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new User();
