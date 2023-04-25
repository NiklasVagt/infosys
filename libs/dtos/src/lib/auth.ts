import { User } from '@infosys/auth-prisma';

export type LoginDto = Pick<User, 'username' | 'password'>;
