import {
  ErrorDto,
  LoginDto,
  TokenDto,
  UserDto,
  loginSchema,
} from '@infosys/dtos';
import { RequestWithUser, handleHttpError } from '@infosys/node-common';
import { RequestHandler } from 'express';
import { AuthService, authService } from '../services/auth.service';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login(): RequestHandler<null, TokenDto | ErrorDto, LoginDto> {
    return async (req, res) => {
      try {
        const dto = loginSchema.parse(req.body);
        const token = await this.authService.createToken(dto);

        return res.json({ token });
      } catch (err) {
        const { code, body } = handleHttpError(err);
        return res.status(code).json(body);
      }
    };
  }

  verifyToken(): RequestHandler<null, UserDto> {
    return (req: RequestWithUser, res) => {
      res.json(req.user);
    };
  }
}

export const authController = new AuthController(authService);
