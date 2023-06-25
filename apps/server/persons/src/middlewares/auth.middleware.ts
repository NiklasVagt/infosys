import { RequestWithUser, handleHttpError } from '@infosys/node-common';
import axios from 'axios';
import { RequestHandler } from 'express';

export const auth =
  (): RequestHandler => async (req: RequestWithUser, res, next) => {
    try {
      await axios.get('https::localhost:3335/api/verify', {
        headers: { Authorisation: req.headers.authorization },
      });

      next();
    } catch (err) {
      const { code, body } = handleHttpError(err);
      res.status(code).json(body);
    }
  };
