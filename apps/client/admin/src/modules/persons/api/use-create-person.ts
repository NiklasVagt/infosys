import { CreatePersonDto, ErrorDto, PersonDto } from '@infosys/dtos';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { tokenStore } from '../../common/store/user.store';

export function useCreatePerson() {
  const [person, setPerson] = useState<PersonDto | null>(null);
  const [error, setError] = useState<string | null>();

  const execute = async (personDto: CreatePersonDto) => {
    setError(null);

    try {
      const res = await axios.post<PersonDto>('/api/persons', personDto, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      });
      setPerson(res.data);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<ErrorDto>;
      const message = error.response?.data?.message ?? error.message;

      setError(message);
    }
  };

  return [person, error, execute] as const;
}
