import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware';
import { authController } from '../controllers/auth.controller';

export const authRouter = () => {
  const router = Router();

  /**
   * POST /api/login
   * @summary Login
   * @tags auth
   * @param {Login} request.body.required - Login info
   * @return {Token} 200 - Success response
   * @return {Error} 400 - Bad request response
   * @return {Error} 401 - Unauthorized response
   */
  router.post('/login', authController.login());

  /**
   * GET /api/verify
   * @summary Verify token
   * @tags auth
   * @return {User} 200 - Success response
   * @return {Error} 400 - Bad request response
   * @return {Error} 403 - Forbidden response
   * @security BearerAuth
   */
  router.get('/verify', auth(), authController.verifyToken());

  return router;
};
