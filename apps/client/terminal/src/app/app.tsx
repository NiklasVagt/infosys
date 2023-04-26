// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import Category from './components/category/category';
import Sidebar from './components/sidebar/sidebar';

export function App() {
  return (
    <div className={styles['shell']}>
      <h1 style={{ gridArea: 'heading', placeSelf: 'center' }}>
        Infosytem ETI
      </h1>

      <Sidebar
        style={{ gridArea: 'sidebar' }}
        className={styles['sidebar']}
      ></Sidebar>

      <Category
        style={{
          gridArea: 'category',
          maxWidth: 'fit-content',
          placeSelf: 'center',
        }}
      ></Category>
    </div>
  );
}

export default App;
