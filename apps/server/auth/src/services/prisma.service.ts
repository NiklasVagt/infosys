import { PrismaClient, Prisma } from '@infosys/auth-prisma';
import { hashPassword } from '../middlewares/hash-password.middleware';

const admin: Prisma.UserCreateInput = {
  username: 'admin',
  password: 'root',
};

const initPrimsa = (): PrismaClient => {
  const client = new PrismaClient();

  client.$use(hashPassword(['create', 'update', 'upsert']));

  console.log('CREATING USER');
  client.user
    .upsert({
      where: { username: admin.username },
      update: {},
      create: admin,
    })
    .then(() => {
      console.log('USER CREATED');
    })
    .catch((err) => console.error('ERROR WHILE CREATING USER', err));

  return client;
};

export const prisma = initPrimsa();
