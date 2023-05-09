import { useState } from 'react';
import styles from './login-form.module.scss';
import { useLogin } from '../../api/use-login';
import { useVerify } from '../../api/use-verify';
import classNames from 'classnames';
import { Icon } from '@iconify/react';

/* eslint-disable-next-line */
export interface LoginFormProps {}

export function LoginForm(props: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loginError, login] = useLogin();
  const [user, verifyError, verify] = useVerify();

  return (
    <form className={styles['container']}>
      {/* username */}
      <div className="form-field">
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
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          <Icon icon={showPassword ? 'carbon:view-off' : 'carbon:view'}></Icon>
        </button>
      </div>

      {/* login error */}
      {loginError && (
        <div className={classNames('error icon', styles['error'])}>
          <Icon icon="carbon:warning"></Icon>
          {loginError}
        </div>
      )}

      {/* token error */}
      {verifyError && (
        <div className={classNames('error icon', styles['error'])}>
          <Icon icon="carbon:warning"></Icon>
          {verifyError}
        </div>
      )}

      {/* login */}
      <button
        type="button"
        className="secondary fill"
        onClick={() => login({ username, password })}
      >
        Login
      </button>

      {/* verify */}
      <button type="button" className="secondary ghost" onClick={verify}>
        Verify token
      </button>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </form>
  );
}

export default LoginForm;
