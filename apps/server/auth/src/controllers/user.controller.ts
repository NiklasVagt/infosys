import { RequestHandler } from 'express';
import { UserRepository, userRepo } from '../services/user.repository';
import { BadRequestError, handleHttpError } from '@infosys/node-common';
import { ErrorDto, UserDto, loginSchema } from '@infosys/dtos';

export class UserController<ItemParams extends Record<'id', string>> {
  constructor(private users: UserRepository) {}

  getAllUsers(): RequestHandler<null, UserDto[] | ErrorDto> {
    return async (req, res) => {
      try {
        const users = await this.users.getAllUsers();
        return res.json(users);
      } catch (err) {
        const { code, body } = handleHttpError(err);
        return res.status(code).json(body);
      }
    };
  }

  createUser(): RequestHandler<null, UserDto | ErrorDto> {
    return async (req, res) => {
      try {
        const userDto = loginSchema.parse(req.body);

        const user = await this.users.createUser(userDto);

        return res.json(user);
      } catch (err) {
        const { code, body } = handleHttpError(err);
        return res.status(code).json(body);
      }
    };
  }

  getUser(): RequestHandler<ItemParams, UserDto | ErrorDto> {
    return async (req, res) => {
      try {
        const id = +req.params.id;
        if (isNaN(id)) throw new BadRequestError();

        const user = await this.users.getUser(id);

        return res.json(user);
      } catch (err) {
        const { code, body } = handleHttpError(err);
        return res.status(code).json(body);
      }
    };
  }

  updateUser(): RequestHandler<ItemParams, UserDto | ErrorDto> {
    return async (req, res) => {
      try {
        const id = +req.params.id;
        if (isNaN(id)) throw new BadRequestError();

        const userDto = req.body;
        if (!req.body) throw new BadRequestError();

        const user = await this.users.updateUser(id, userDto);
        return res.json(user);
      } catch (err) {
        const { code, body } = handleHttpError(err);
        return res.status(code).json(body);
      }
    };
  }

  deleteUser(): RequestHandler<ItemParams, UserDto[] | ErrorDto> {
    return async (req, res) => {
      try {
        const id = +req.params.id;
        if (isNaN(id)) throw new BadRequestError();

        const users = await this.users.deleteUser(id);
        return res.json(users);
      } catch (err) {
        const { code, body } = handleHttpError(err);
        return res.status(code).json(body);
      }
    };
  }
}

export const userController = new UserController(userRepo);
