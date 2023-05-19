import styles from './user-list-page.module.scss';
import UsersList from '../components/users-list/users-list';
import classNames from 'classnames';

/* eslint-disable-next-line */
export interface UserListPageProps {}

export function UserListPage(props: UserListPageProps) {
  return (
    <div className={classNames('page-container')}>
      <UsersList style={{ flex: 1 }}></UsersList>
    </div>
  );
}

export default UserListPage;
