import { LinkProps, NavLink } from 'react-router-dom';
import styles from './sidebar.module.scss';
import classNames from 'classnames';

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<LinkProps & { label: string; icon: React.ReactNode }>;
}

export function Sidebar({ items, className, ...props }: SidebarProps) {
  return (
    <nav className={classNames(styles['container'], className)} {...props}>
      <ul className={styles['list']}>
        {items.map(({ label, ...item }) => (
          <li key={label}>
            <NavLink
              {...item}
              className={classNames(item.className, 'ghost', styles['link'])}
            >
              {item.icon}
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
