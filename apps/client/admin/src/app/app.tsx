import { LinkProps, Outlet } from 'react-router-dom';
import styles from './app.module.scss';
import Sidebar from '../modules/common/components/sidebar/sidebar';
import Navbar from '../modules/common/components/navbar/navbar';
import { useSnapshot } from 'valtio';
import { commonState } from '../modules/common/store/common.store';
import classNames from 'classnames';

const menuItems: Array<LinkProps & { label: string }> = [
  {
    label: 'Users',
    to: '/users',
  },
  {
    label: 'Events',
    to: '/events',
  },
  {
    label: 'Locations',
    to: '/locations',
  },
  {
    label: 'Persons',
    to: '/persons',
  },
];

export function App() {
  const snap = useSnapshot(commonState);

  return (
    <div className={styles['container']}>
      <Navbar className={styles['navbar']}></Navbar>
      <Sidebar
        items={menuItems}
        className={classNames(styles['sidebar'], {
          [styles['closed']]: !snap.sidebarOpen,
        })}
      ></Sidebar>

      <div className={styles['content']}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
