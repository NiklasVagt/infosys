import { CSSProperties } from 'react';
import styles from './category.module.scss';

export interface CategoryProps {
  style?: CSSProperties;
}

export function Category({ style }: CategoryProps) {
  return (
    <div style={style} className={styles['container']}>
      <h2>Welcome to Category!</h2>

      <ul className={styles['button-list']}>
        <li>
          <button>Office</button>
        </li>
        <li>
          <button>Room</button>
        </li>
        <li>
          <button>Person</button>
        </li>
      </ul>
    </div>
  );
}

export default Category;
