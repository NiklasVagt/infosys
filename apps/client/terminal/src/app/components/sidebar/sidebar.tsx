import { CSSProperties } from 'react';
import styles from './sidebar.module.scss';
import classNames from 'classnames';
import { ReactComponent as Logo } from '../../../assets/icons/logo.svg';
import { QRCodeSVG } from 'qrcode.react';
import { Link, useLocation } from 'react-router-dom';

export interface SidebarProps {
  className?: string;
  style?: CSSProperties;
}

export function Sidebar({ className, style }: SidebarProps) {
  const location = useLocation();

  return (
    <div style={style} className={classNames(styles['container'], className)}>
      {/* Home */}
      <Link to="/" className="ghost host round">
        <Logo />
      </Link>

      {/* QR Code */}
      <div className={styles['qr-container']}>
        <QRCodeSVG
          className={styles['qr-code']}
          value={new URL(location.pathname, window.location.origin).href}
          bgColor="transparent"
          fgColor="hsl(var(--info-bg-text))"
        ></QRCodeSVG>
        <small>Get it on your phone</small>
      </div>
    </div>
  );
}

export default Sidebar;
