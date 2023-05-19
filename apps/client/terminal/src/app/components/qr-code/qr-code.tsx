import styles from './qr-code.module.scss';

/* eslint-disable-next-line */
export interface QrCodeProps {}

export function QrCode(props: QrCodeProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to QrCode!</h1>
    </div>
  );
}

export default QrCode;
