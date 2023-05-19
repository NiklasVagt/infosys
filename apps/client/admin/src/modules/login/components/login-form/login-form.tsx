import { MouseEvent, useState } from 'react';
import styles from './login-form.module.scss';
import { useLogin } from '../../api/use-login';
import classNames from 'classnames';
import { Icon } from '@iconify/react';

/* eslint-disable-next-line */
export interface LoginFormProps {}

export function LoginForm(props: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loginError, login] = useLogin();

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();

    await login({ username, password }).catch(() => null);
  };

  return (
    <form className={styles['container']}>
      {/* username */}
      <div className="form-field">
        <Icon icon="carbon:user" className="prefix"></Icon>
        <input
          id="username"
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* password */}
      <div className="form-field form-field-group">
        <Icon icon="carbon:password" className="prefix"></Icon>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          title={showPassword ? 'hide password' : 'reveal password'}
          onClick={() => setShowPassword(!showPassword)}
        >
          <Icon icon={showPassword ? 'carbon:view-off' : 'carbon:view'}></Icon>
        </button>
      </div>

      {/* login error */}
      {loginError && (
        <div className={classNames('error-message icon', styles['error'])}>
          <Icon icon="carbon:warning"></Icon>
          {loginError}
        </div>
      )}

      {/* login */}
      <button
        type="submit"
        className="secondary fill inline-icon"
        onClick={handleSubmit}
      >
        <Icon icon="carbon:login"></Icon>
        <span>Login</span>
      </button>
    </form>
  );
}

export default LoginForm;
