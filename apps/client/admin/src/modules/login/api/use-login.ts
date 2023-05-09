import type { Prisma } from '@infosys/auth-prisma';
import { ErrorDto, TokenDto } from '@infosys/dtos';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';

export function useLogin() {
  const [error, setError] = useState<null | string>();

  const execute = async (user: Prisma.UserCreateInput) => {
    setError('');

    try {
      const res = await axios.post<TokenDto>('/api/login', user);

      localStorage.setItem('token', res.data.token);
    } catch (err) {
      const error = err as AxiosError<ErrorDto>;
      const message = error.response?.data?.message ?? error.message;

      localStorage.removeItem('token');

      setError(message);
    }
  };

  return [error, execute] as const;
}
