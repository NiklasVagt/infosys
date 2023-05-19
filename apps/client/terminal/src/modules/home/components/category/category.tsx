import styles from './category.module.scss';
import { CategoryItemList } from '../../models/category.model';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type CategoryWithHtmlAttributes = React.HTMLAttributes<HTMLDivElement> &
  CategoryItemList;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CategoryProps extends CategoryWithHtmlAttributes {}

export function Category({ title, items, className, ...props }: CategoryProps) {
  return (
    <div {...props} className={classNames(styles['container'], className)}>
      <h2>{title}</h2>

      <ul className={styles['button-list']}>
        {items.map((item) => (
          <li key={item.title}>
            <Link to={item.href}>
              {item.icon}
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Category;
