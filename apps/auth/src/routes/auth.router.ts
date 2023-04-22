import { Router } from 'express';
import { authService } from '../services/auth.service';
import { LoginDto } from '@infosys/dtos';
import { BadRequestError, StatusError } from '@infosys/node-common';

export const router = Router();

router.post<LoginDto>('/login', async (req, res) => {
  try {
    const dto = req.body;

    if (!dto?.password || !dto?.username) throw new BadRequestError();

    const token = await authService.createToken(dto);

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(err.code ?? 500).json({ err: err.message });
  }
});

router.get('/verify', () => {
  console.log('TODO');
});
