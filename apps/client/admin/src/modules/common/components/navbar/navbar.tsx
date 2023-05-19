import classNames from 'classnames';
import styles from './navbar.module.scss';
import { useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { useSnapshot } from 'valtio';
import { userState } from '../../store/user.store';
import { Icon } from '@iconify/react';
import { commonState } from '../../store/common.store';

/* eslint-disable-next-line */
export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

function User({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const snap = useSnapshot(userState);
  return (
    <div className={classNames(styles['user'], className)} {...props}>
      <Icon icon="carbon:user-avatar" />
      {snap.user?.username}
    </div>
  );
}

export function Navbar({ className, ...props }: NavbarProps) {
  const location = useLocation();

  return (
    <div className={classNames(styles['container'], className)} {...props}>
      <button
        className="primary ghost inline-icon"
        onClick={() => (commonState.sidebarOpen = !commonState.sidebarOpen)}
      >
        <Icon icon="carbon:menu"></Icon>
      </button>

      <h1 className={styles['heading']}>Infosys</h1>
      <h2 className={styles['title']}>{location.pathname.split('/')[1]}</h2>

      <Suspense
        fallback={
          <Icon
            icon="svg-spinners:12-dots-scale-rotate"
            className={styles['avatar']}
          />
        }
      >
        <User className={styles['avatar']}></User>
      </Suspense>
    </div>
  );
}

export default Navbar;
