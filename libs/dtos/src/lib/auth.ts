import { User } from '@infosys/auth-prisma';

export type LoginDto = Pick<User, 'username' | 'password'>;

export type UserDto = Omit<User, 'password'>;

export interface TokenDto {
  token: string;
}
