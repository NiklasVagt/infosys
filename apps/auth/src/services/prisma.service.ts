import { PrismaClient } from '@infosys/auth-prisma';
import { hashPassword } from '../middlewares/hash-password.middleware';

const initPrimsa = (): PrismaClient => {
  const client = new PrismaClient();

  client.$use(hashPassword(['create', 'update']));

  return client;
};

export const prisma = initPrimsa();
