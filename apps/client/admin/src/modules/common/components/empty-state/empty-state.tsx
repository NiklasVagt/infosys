import styles from './empty-state.module.scss';

/* eslint-disable-next-line */
export interface EmptyStateProps {}

export function EmptyState(props: EmptyStateProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to EmptyState!</h1>
    </div>
  );
}

export default EmptyState;
