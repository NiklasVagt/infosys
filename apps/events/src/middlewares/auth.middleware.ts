import { RequeustWithUser } from '../models/request-with-user.model';

export const AuthMiddleware = () => (req: RequeustWithUser, res, next) => {
  console.info(req.ip);

  const user = { name: 'Ben' };

  req.user = user;

  next();
};
