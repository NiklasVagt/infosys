import { Prisma } from '@infosys/auth-prisma';
import { hash } from 'bcrypt';

const SALT_ROUNDS = 12;

export const hashPassword =
  (actions: Prisma.PrismaAction[]): Prisma.Middleware =>
  async (params, next) => {
    if (!actions.includes(params.action)) return await next(params);
    if (params.model !== 'User') return await next(params);

    const password = params.args?.data?.password as string | undefined;
    if (password == null) return await next(params);

    params.args.data.password = await hash(password, SALT_ROUNDS);

    return await next(params);
  };
