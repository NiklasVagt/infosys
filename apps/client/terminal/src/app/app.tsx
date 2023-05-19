import { Outlet } from 'react-router-dom';
import styles from './app.module.scss';
import Sidebar from './components/sidebar/sidebar';

export function App() {
  return (
    <div className={styles['shell']}>
      <h1>Infosytem ETI</h1>

      <Sidebar style={{ gridArea: 'sidebar' }} className={styles['sidebar']} />

      <Outlet></Outlet>
    </div>
  );
}

export default App;
