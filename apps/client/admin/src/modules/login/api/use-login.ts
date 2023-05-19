import type { Prisma } from '@infosys/auth-prisma';
import { ErrorDto, TokenDto } from '@infosys/dtos';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useVerify } from './use-verify';
import { tokenStore } from '../../common/store/user.store';

export function useLogin() {
  const [error, setError] = useState<null | string>();
  const [, , verify] = useVerify();

  const execute = async (credentials: Prisma.UserCreateInput) => {
    setError('');

    try {
      const res = await axios.post<TokenDto>('/api/login', credentials);

      tokenStore.token = res.data.token;

      return await verify();
    } catch (err) {
      const error = err as AxiosError<ErrorDto>;
      const message = error.response?.data?.message ?? error.message;

      tokenStore.token = null;

      setError(message);
    }
  };

  return [error, execute] as const;
}
