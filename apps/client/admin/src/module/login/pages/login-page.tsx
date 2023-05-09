import LoginForm from '../components/login-form/login-form';
import styles from './login-page.module.scss';

/* eslint-disable-next-line */
export interface LoginPageProps {}

export function LoginPage(props: LoginPageProps) {
  return (
    <div className={styles['container']}>
      <div className="card">
        <h1>Login</h1>

        <LoginForm></LoginForm>
      </div>
    </div>
  );
}

export default LoginPage;
