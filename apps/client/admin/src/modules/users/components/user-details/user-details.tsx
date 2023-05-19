import { UserDto } from '@infosys/dtos';
import { useMemo, useState } from 'react';
import { useUpsertUser } from '../../api/use-upsert-user';
import { useDeleteUser } from '../../api/use-delete-user';
import { useNavigate, useRevalidator } from 'react-router-dom';
import { Prisma } from '@infosys/auth-prisma';
import FormField from '../../../common/components/form-field/form-field';
import Form from '../../../common/components/form/form';
import { Icon } from '@iconify/react';

/* eslint-disable-next-line */
export interface UserDetailsProps extends UserDto {}

export function UserDetails({ id, ...props }: UserDetailsProps) {
  const [username, setUsername] = useState(props.username);
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const { revalidate } = useRevalidator();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>();

  const [, upsertError, create, update] = useUpsertUser();
  const [, deleteError, remove] = useDeleteUser();

  useMemo(() => {
    setError(upsertError || deleteError);
  }, [upsertError, deleteError]);

  const isNewUser = +id === -1;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordRepeat) return setError('Passwords do not match');

    if (isNewUser) {
      const user = await create({ username, password });
      if (user) navigate(`/users/${user?.id}`);
    } else {
      const dto: Prisma.UserUpdateInput = { username };
      if (password) dto.password = password;
      await update(id, dto);
    }

    revalidate();
  };

  const handleDelete = async () => {
    await remove(id);
    navigate('/users');
    revalidate();
  };

  return (
    <Form
      {...{
        handleSave,
        handleDelete,
        error,
        saveBtn: true,
        deleteBtn: !isNewUser,
      }}
    >
      {/* id */}
      {!isNewUser && (
        <FormField
          id="user-id"
          type="text"
          disabled
          value={id}
          prefix={<Icon icon="carbon:id" />}
        >
          ID
        </FormField>
      )}

      {/* username */}
      <FormField
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        prefix={<Icon icon="carbon:user" />}
      >
        Username
      </FormField>

      {/* password */}
      <FormField
        id="password"
        type="password"
        value={password}
        placeholder="***"
        onChange={(e) => setPassword(e.target.value)}
        prefix={<Icon icon="carbon:password" />}
      >
        New password
      </FormField>

      {/* passwordRepeat */}
      <FormField
        id="passwordRepeat"
        type="password"
        value={passwordRepeat}
        placeholder="***"
        onChange={(e) => setPasswordRepeat(e.target.value)}
        prefix={<Icon icon="carbon:repeat" />}
      >
        Repeat password
      </FormField>
    </Form>
  );
}

export default UserDetails;
