import { PersonDto } from '@infosys/dtos';
import { useMemo, useState } from 'react';
import { useCreatePerson } from './use-create-person';
import { useUpdatePerson } from './use-update-person';

export function useUpsertPerson() {
  const [person, setPerson] = useState<PersonDto | null>();
  const [error, setError] = useState<string | null>();

  const [newPerson, createError, createPerson] = useCreatePerson();
  const [changedPerson, updateError, updatePerson] = useUpdatePerson();

  useMemo(() => {
    setPerson(newPerson ?? changedPerson);
  }, [newPerson, changedPerson]);

  useMemo(() => {
    setError(createError ?? updateError);
  }, [createError, updateError]);

  return [person, error, createPerson, updatePerson] as const;
}
