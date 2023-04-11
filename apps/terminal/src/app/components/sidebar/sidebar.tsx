import { CSSProperties } from 'react';
import styles from './sidebar.module.scss';
import classNames from 'classnames';

export interface SidebarProps {
  className?: string;
  style?: CSSProperties;
}

export function Sidebar({ className, style }: SidebarProps) {
  return (
    <div style={style} className={classNames(styles['container'], className)}>
      <div>Logo!</div>
      <div>language</div>
      <div>QR-CODE</div>
    </div>
  );
}

export default Sidebar;
