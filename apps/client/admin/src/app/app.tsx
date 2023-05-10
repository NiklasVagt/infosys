import { LinkProps, Outlet } from 'react-router-dom';
import styles from './app.module.scss';
import Sidebar from '../modules/common/components/sidebar/sidebar';

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
  return (
    <div className={styles['container']}>
      <Sidebar items={menuItems}></Sidebar>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
