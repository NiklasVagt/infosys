import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { NotFoundError, UnauthorizedError } from '@infosys/node-common';
import { LoginDto } from '@infosys/dtos';
import { prisma } from './prisma.service';

const SECRET = 'if-you-can-read-this-you-need-no-glasses';

class AuthService {
  constructor(private users: PrismaClient['user']) {}

  /**
   * 1. User logs in on FE
   * 2. FE sends /api/login request to BE
   * 3. BE creates token
   * 4. BE sends created token back to FE
   */
  public async createToken({ username, password }: LoginDto) {
    const user = await this.users.findUnique({ where: { username } });
    if (!user) throw new NotFoundError();

    const isValidPassword = compare(password, user.password);
    if (!isValidPassword) throw new UnauthorizedError();

    return sign({ sub: 1 }, SECRET, {
      expiresIn: '1h',
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
  public async validateToken() {
    console.log('TODO');
  }
}

export const authService = new AuthService(prisma.user);
