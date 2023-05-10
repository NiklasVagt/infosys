import { ErrorDto, UserDto } from '@infosys/dtos';
import { Prisma } from '@infosys/auth-prisma';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';

export function useCreateUser() {
  const [user, setUser] = useState<UserDto | null>(null);
  const [error, setError] = useState<string | null>();

  const execute = async (userDto: Prisma.UserCreateInput) => {
    setError(null);

    try {
      const res = await axios.post<UserDto>('/api/users', userDto, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUser(res.data);

      return res.data;
    } catch (err) {
      const error = err as AxiosError<ErrorDto>;
      const message = error.response?.data?.message ?? error.message;

      setError(message);
    }
  };

  return [user, error, execute] as const;
}
