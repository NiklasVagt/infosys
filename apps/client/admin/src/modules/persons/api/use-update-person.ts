import { ErrorDto, PersonDto, UpdatePersonDto } from '@infosys/dtos';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { tokenStore } from '../../common/store/user.store';

export function useUpdatePerson() {
  const [person, setPerson] = useState<PersonDto | null>(null);
  const [error, setError] = useState<string | null>();

  const execute = async (id: PersonDto['id'], personDto: UpdatePersonDto) => {
    setError(null);

    try {
      const res = await axios.patch<PersonDto>(
        `/api/persons/${id}`,
        personDto,
        {
          headers: { Authorization: `Bearer ${tokenStore.token}` },
        }
      );
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
