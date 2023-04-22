import { sign, verify } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { PrismaClient, User } from '@infosys/auth-prisma';
import {
  BEARER_PREFIX,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '@infosys/node-common';
import { LoginDto } from '@infosys/dtos';
import { prisma } from './prisma.service';

// NEVER STORE PRODUCTION SECRETS IN CODE
const SECRET = process.env.SECRET ?? 'if-you-can-read-this-you-need-no-glasses';
const EXPIRATION = '1h';

class AuthService {
  constructor(private users: PrismaClient['user']) {}

  /**
   * 1. User logs in on FE
   * 2. FE sends /api/login request to BE
   * 3. BE creates token
   * 4. BE sends created token back to FE
   */
  public async createToken({ username, password }: LoginDto) {
    // const user = await this.users.findUnique({ where: { username } });
    // if (!user) throw new NotFoundError();

    // const isValidPassword = compare(password, user.password);
    // if (!isValidPassword) throw new UnauthorizedError();

    return sign({ sub: 1 }, SECRET, {
      expiresIn: EXPIRATION,
      algorithm: 'HS256',
    });
  }

  /**
   * 1. User is logged in and has token stored in FE
   * 2. User wants to use restricted API
   * 3. User sends JWT via Authorization header to BE
   * 4. BE gets token from Authorization header
   * 5. BE validates token
   * 6. Execute API function
   */
  public async validateToken(
    bearer: `${typeof BEARER_PREFIX}${string}`
  ): Promise<User> {
    const [, token] = bearer.split('Bearer ');

    const payload = verify(token, SECRET, {
      maxAge: EXPIRATION,
      algorithms: ['HS256'],
    });

    if (typeof payload === 'string' || payload.sub == null)
      throw new ForbiddenError();

    const user = await this.users.findUnique({ where: { id: +payload.sub } });
    if (!user) throw new ForbiddenError();

    return user;
  }
}

export const authService = new AuthService(prisma.user);
