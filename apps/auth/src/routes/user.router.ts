import { Router } from 'express';
import { userController } from '../controllers/user.controller';

export const userRouter = () => {
  const router = Router();

  router
    .route('/')
    .get(userController.getAllUsers())
    .post(userController.createUser());

  router
    .route('/:id')
    .get(userController.getUser())
    .patch(userController.updateUser())
    .delete(userController.deleteUser());

  return router;
};
