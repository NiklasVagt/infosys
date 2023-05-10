import { useMemo, useState } from 'react';
import { useCreateUser } from './use-create-user';
import { useUpdateUser } from './use-update-user';
import { UserDto } from '@infosys/dtos';

export function useUpsertUser() {
  const [user, setUser] = useState<UserDto | null>();
  const [error, setError] = useState<string | null>();

  const [newUser, createError, createUser] = useCreateUser();
  const [changedUser, updateError, updateUser] = useUpdateUser();

  useMemo(() => {
    setUser(newUser ?? changedUser);
  }, [newUser, changedUser]);

  useMemo(() => {
    setError(createError ?? updateError);
  }, [createError, updateError]);

  return [user, error, createUser, updateUser] as const;
}
