import Category from '../components/category/category';
import styles from './home-page.module.scss';
import { categories } from '../constants/categories.const';

/* eslint-disable-next-line */
export interface HomePageProps {}

export function HomePage(props: HomePageProps) {
  return (
    <div className={styles['container']}>
      {categories.map((category, index) => (
        <Category
          {...category}
          key={category.title}
          className={styles['category']}
        ></Category>
      ))}
    </div>
  );
}

export default HomePage;
