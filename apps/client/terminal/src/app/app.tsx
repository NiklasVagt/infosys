import { Outlet } from 'react-router-dom';
import styles from './app.module.scss';
import Sidebar from './components/sidebar/sidebar';

export function App() {
  return (
    <div className={styles['shell']}>
      <h1>Infosytem ETI</h1>

      <Sidebar className={styles['sidebar']} />
      <div className={styles['sidebar-spacer']}></div>

      <Outlet></Outlet>
    </div>
  );
}

export default App;
