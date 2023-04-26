import { sign, verify } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import {
  BEARER_PREFIX,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '@infosys/node-common';
import { LoginDto, UserDto } from '@infosys/dtos';
import { UserRepository, userRepo } from './user.repository';

// NEVER STORE PRODUCTION SECRETS IN CODE
const SECRET = process.env.SECRET ?? 'if-you-can-read-this-you-need-no-glasses';
const EXPIRATION = '1h';

class AuthService {
  constructor(private users: UserRepository) {}

  /**
   * 1. User logs in on FE
   * 2. FE sends /api/login request to BE
   * 3. BE creates token
   * 4. BE sends created token back to FE
   */
  public async createToken({ username, password }: LoginDto) {
    const user = await this.users.getUserByUsername(username);
    if (!user) throw new NotFoundError();

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) throw new UnauthorizedError();

    return sign({ sub: user.id }, SECRET, {
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
  ): Promise<UserDto> {
    const [, token] = bearer.split(BEARER_PREFIX);

    const payload = verify(token, SECRET, {
      maxAge: EXPIRATION,
      algorithms: ['HS256'],
    });

    if (typeof payload === 'string' || payload.sub == null)
      throw new ForbiddenError();

    const user = await this.users.getUser(+payload.sub);
    if (!user) throw new ForbiddenError();

    return user;
  }
}

export const authService = new AuthService(userRepo);
