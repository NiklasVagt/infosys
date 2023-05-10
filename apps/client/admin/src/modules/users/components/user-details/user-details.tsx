import { UserDto } from '@infosys/dtos';
import styles from './user-details.module.scss';
import { useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { useUpsertUser } from '../../api/use-upsert-user';
import { useDeleteUser } from '../../api/use-delete-user';
import classNames from 'classnames';
import { useNavigate, useRevalidator } from 'react-router-dom';
import { Prisma } from '@infosys/auth-prisma';

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
    revalidate();
  };

  return (
    <form className={styles['container']}>
      {/* id */}
      {!isNewUser && (
        <>
          <label htmlFor="user-id">ID</label>
          <input id="user-id" type="text" disabled value={id} />
        </>
      )}

      {/* username */}
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* password */}
      <label htmlFor="password">New password</label>
      <input
        id="password"
        type="password"
        value={password}
        placeholder="***"
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* passwordRepeat */}
      <label htmlFor="passwordRepeat">Repeat password</label>
      <input
        id="passwordRepeat"
        type="password"
        value={passwordRepeat}
        placeholder="***"
        onChange={(e) => setPasswordRepeat(e.target.value)}
      />

      {/* error */}
      {error && (
        <div className={classNames('error-message', styles['error'])}>
          {error}
        </div>
      )}

      {/* actions */}
      <ul className={styles['actions']}>
        {/* save */}
        <li>
          <button
            type="submit"
            className="secondary ghost inline-icon"
            onClick={handleSave}
          >
            <Icon icon="carbon:save"></Icon>
            <span>Save</span>
          </button>
        </li>

        {/* delete */}
        {!isNewUser && (
          <li>
            <button
              type="button"
              className="error ghost inline-icon"
              onClick={handleDelete}
            >
              <Icon icon="carbon:delete"></Icon>
              <span>Delete</span>
            </button>
          </li>
        )}
      </ul>
    </form>
  );
}

export default UserDetails;
