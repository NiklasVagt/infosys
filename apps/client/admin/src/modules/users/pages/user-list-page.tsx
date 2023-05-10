import styles from './user-list-page.module.scss';
import UsersList from '../components/users-list/users-list';

/* eslint-disable-next-line */
export interface UserListPageProps {}

export function UserListPage(props: UserListPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Users</h1>

      <UsersList style={{ flex: 1 }}></UsersList>
    </div>
  );
}

export default UserListPage;
