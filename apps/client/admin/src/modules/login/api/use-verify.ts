import { ErrorDto, UserDto } from '@infosys/dtos';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';

export function useVerify() {
  const [user, setUser] = useState<UserDto | null>(null);
  const [error, setError] = useState<string | null>();

  const execute = async () => {
    const token = `Bearer ${localStorage.getItem('token')}`;

    setUser(null);
    setError(null);

    try {
      const res = await axios.get<UserDto>('/api/verify', {
        headers: { Authorization: token },
      });

      setUser(res.data);
    } catch (err) {
      const error = err as AxiosError<ErrorDto>;
      const message = error.response?.data?.message ?? error.message;

      setError(message);
    }
  };

  return [user, error, execute] as const;
}
