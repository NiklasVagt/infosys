import { useState } from 'react';
import { User } from '@infosys/auth-prisma';
import axios, { AxiosError } from 'axios';
import { ErrorDto, UserDto } from '@infosys/dtos';

export function useDeleteUser() {
  const [users, setUsers] = useState<UserDto[] | null>(null);
  const [error, setError] = useState<string | null>();

  const execute = async (id: User['id']) => {
    setError(null);

    try {
      const res = await axios.delete<UserDto[]>(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(res.data);

      return res.data;
    } catch (err) {
      const error = err as AxiosError<ErrorDto>;
      const message = error.response?.data?.message ?? error.message;

      setError(message);
    }
  };

  return [users, error, execute] as const;
}
