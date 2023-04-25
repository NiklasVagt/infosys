import { Router } from 'express';
import { authService } from '../services/auth.service';
import { LoginDto } from '@infosys/dtos';
import {
  BEARER_PREFIX,
  BadRequestError,
  ForbiddenError,
  handleHttpError,
} from '@infosys/node-common';

export const router = Router();

router.post<LoginDto>('/login', async (req, res) => {
  try {
    const dto = req.body;

    if (!dto?.password || !dto?.username) throw new BadRequestError();

    const token = await authService.createToken(dto);

    return res.json({ token });
  } catch (err) {
    const { code, body } = handleHttpError(err);
    return res.status(code).json(body);
  }
});

const isBearerString = (
  maybeBearer: string
): maybeBearer is `${typeof BEARER_PREFIX}${string}` =>
  maybeBearer.startsWith(BEARER_PREFIX);

router.get('/verify', async (req, res) => {
  try {
    const bearer = req.headers.authorization;

    if (!bearer) throw new ForbiddenError();
    if (!isBearerString(bearer)) throw new ForbiddenError();

    const user = await authService.validateToken(bearer);

    return res.json(user);
  } catch (err) {
    const { code, body } = handleHttpError(err);
    return res.status(code).json(body);
  }
});
