import { ErrorDto, UserDto, isErrorDto } from '@infosys/dtos';
import styles from './users-list.module.scss';
import classNames from 'classnames';
import { NavLink, Outlet, useLoaderData } from 'react-router-dom';
import { Icon } from '@iconify/react';

// eslint-disable-next-line
export interface UsersListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UsersList({ className, ...props }: UsersListProps) {
  const usersOrError = useLoaderData() as UserDto[] | ErrorDto;

  return (
    <div {...props} className={classNames(className, 'list-container')}>
      {isErrorDto(usersOrError) ? (
        <div className="error-message">{usersOrError.message}</div>
      ) : (
        <ol className={classNames('list')}>
          {usersOrError.map((user) => (
            <li key={user.id}>
              <NavLink to={`/users/${user.id}`} className="ghost">
                {user.username}
              </NavLink>
            </li>
          ))}

          <li>
            <NavLink
              to={`/users/create`}
              className="secondary outline inline-icon"
            >
              <Icon icon="carbon:user-follow"></Icon>
              Add user
            </NavLink>
          </li>
        </ol>
      )}

      <div className={classNames('item')}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default UsersList;
