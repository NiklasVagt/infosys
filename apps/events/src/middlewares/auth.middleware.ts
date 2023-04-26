import { RequestWithUser } from '@infosys/node-common';

export const AuthMiddleware = () => (req: RequestWithUser, res, next) => {
  const user = { id: 0, username: 'Ben' };

  req.user = user;

  next();
};
