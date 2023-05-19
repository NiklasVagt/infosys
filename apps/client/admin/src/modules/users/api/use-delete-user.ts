import { useState } from 'react';
import { User } from '@infosys/auth-prisma';
import axios, { AxiosError } from 'axios';
import { ErrorDto, UserDto } from '@infosys/dtos';
import { tokenStore } from '../../common/store/user.store';

export function useDeleteUser() {
  const [users, setUsers] = useState<UserDto[] | null>(null);
  const [error, setError] = useState<string | null>();

  const execute = async (id: User['id']) => {
    setError(null);

    try {
      const res = await axios.delete<UserDto[]>(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
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
