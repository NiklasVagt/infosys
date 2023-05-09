import { Icon } from '@iconify/react';
import LoginForm from '../components/login-form/login-form';
import styles from './login-page.module.scss';

/* eslint-disable-next-line */
export interface LoginPageProps {}

export function LoginPage(props: LoginPageProps) {
  return (
    <div className={styles['container']}>
      <h1>
        <Icon icon="carbon:login"></Icon>
        <span>Login</span>
      </h1>

      <LoginForm></LoginForm>
    </div>
  );
}

export default LoginPage;
