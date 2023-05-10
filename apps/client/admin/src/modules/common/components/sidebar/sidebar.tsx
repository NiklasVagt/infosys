import { Link, LinkProps } from 'react-router-dom';
import styles from './sidebar.module.scss';
import classNames from 'classnames';

export interface SidebarProps {
  items: Array<LinkProps & { label: string }>;
}

export function Sidebar({ items }: SidebarProps) {
  return (
    <nav className={styles['container']}>
      <ul className={styles['list']}>
        {items.map(({ label, ...item }) => (
          <li key={label}>
            <Link {...item} className={classNames(item.className, 'ghost')}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
