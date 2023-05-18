import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { auth } from '../middlewares/auth.middleware';

export const userRouter = () => {
  const router = Router();

  router.use(auth());

  router
    .route('/')

    /**
     * GET /api/users
     * @summary Get all users
     * @tags users
     * @return {array<User>} 200 - Success response
     * @return {Error} 400 - Bad request response
     * @return {Error} 403 - Forbidden response
     * @security BearerAuth
     */
    .get(userController.getAllUsers())

    /**
     * POST /api/users
     * @summary Create a new user
     * @tags users
     * @param {Login} request.body.required - New user
     * @return {User} 200 - Success response
     * @return {Error} 400 - Bad request response
     * @return {Error} 403 - Forbidden response
     * @security BearerAuth
     */
    .post(userController.createUser());

  router
    .route('/:id')

    /**
     * GET /api/users/{id}
     * @summary Get a user by id
     * @tags users
     * @param {string} id.path - User id
     * @return {User} 200 - Success response
     * @return {Error} 400 - Bad request response
     * @return {Error} 403 - Forbidden response
     * @return {Error} 404 - Not found response
     * @security BearerAuth
     */
    .get(userController.getUser())

    /**
     * PATCH /api/users/{id}
     * @summary Update a user by id
     * @tags users
     * @param {string} id.path - User id
     * @param {UpdateUser} request.body.required - User info
     * @return {User} 200 - Success response
     * @return {Error} 400 - Bad request response
     * @return {Error} 403 - Forbidden response
     * @return {Error} 404 - Not found response
     * @security BearerAuth
     */
    .patch(userController.updateUser())

    /**
     * DELETE /api/users/{id}
     * @summary Delete a user by id
     * @tags users
     * @param {string} id.path - User id
     * @return {array<User>} 200 - Success response
     * @return {Error} 400 - Bad request response
     * @return {Error} 403 - Forbidden response
     * @return {Error} 404 - Not found response
     * @security BearerAuth
     */
    .delete(userController.deleteUser());

  return router;
};
