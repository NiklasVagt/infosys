import { Link } from 'react-router-dom';
import styles from './error-state.module.scss';
import { Icon } from '@iconify/react';

/* eslint-disable-next-line */
export interface ErrorStateProps {}

export function ErrorState(props: ErrorStateProps) {
  return (
    <div className={styles['page-container']}>
      {/* <p className={styles['back']}>Oops!</p> */}

      <div className={styles['container']}>
        <Icon icon="carbon:warning-hex" className={styles['icon']}></Icon>
        <h1>Something went wrong</h1>

        <Link to="/login" className="secondary ghost outline inline-icon">
          <Icon icon="carbon:login"></Icon>
          <span>Login again</span>
        </Link>
      </div>
    </div>
  );
}

export default ErrorState;
