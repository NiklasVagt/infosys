import { useLoaderData } from 'react-router-dom';
import UserDetails from '../components/user-details/user-details';
import styles from './user-item-page.module.scss';
import { ErrorDto, UserDto, isErrorDto } from '@infosys/dtos';

/* eslint-disable-next-line */
export interface UserItemPageProps {}

export function UserItemPage(props: UserItemPageProps) {
  const userOrError = useLoaderData() as UserDto | ErrorDto;

  return (
    <div className={styles['container']}>
      {isErrorDto(userOrError) ? (
        <div className="error-message">{userOrError.message}</div>
      ) : (
        <UserDetails key={userOrError.id} {...userOrError}></UserDetails>
      )}
    </div>
  );
}

export default UserItemPage;
