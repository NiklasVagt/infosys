import { ErrorDto, UserDto, isErrorDto } from '@infosys/dtos';
import styles from './users-list.module.scss';
import classNames from 'classnames';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { Icon } from '@iconify/react';

// eslint-disable-next-line
export interface UsersListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UsersList({ className, ...props }: UsersListProps) {
  const usersOrError = useLoaderData() as UserDto[] | ErrorDto;

  return (
    <div {...props} className={classNames(className, styles['container'])}>
      {isErrorDto(usersOrError) ? (
        <div className="error-message">{usersOrError.message}</div>
      ) : (
        <ol className={styles['list']}>
          {usersOrError.map((user) => (
            <li key={user.id}>
              <Link to={`/users/${user.id}`} className="ghost">
                {user.username}
              </Link>
            </li>
          ))}

          <li>
            <Link
              to={`/users/create`}
              className="secondary outline inline-icon"
            >
              <Icon icon="carbon:add"></Icon>
              Add user
            </Link>
          </li>
        </ol>
      )}

      <div className={styles['item']}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default UsersList;
