import { Outlet } from 'react-router-dom';
import styles from './app.module.scss';
import Sidebar, {
  SidebarProps,
} from '../modules/common/components/sidebar/sidebar';
import Navbar from '../modules/common/components/navbar/navbar';
import { useSnapshot } from 'valtio';
import { commonState } from '../modules/common/store/common.store';
import classNames from 'classnames';
import { Icon } from '@iconify/react';

const menuItems: SidebarProps['items'] = [
  {
    icon: <Icon icon="carbon:events"></Icon>,
    label: 'Users',
    to: '/users',
  },
  {
    icon: <Icon icon="carbon:event-schedule"></Icon>,
    label: 'Events',
    to: '/events',
  },
  {
    icon: <Icon icon="carbon:location"></Icon>,
    label: 'Locations',
    to: '/locations',
  },
  {
    icon: <Icon icon="carbon:person"></Icon>,
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
