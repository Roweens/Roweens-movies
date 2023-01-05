import styles from './LoginForm.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleSignIn } from '../../features/auth-slice';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(handleSignIn({ email, password }))
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.loginFormWrapper}>
      <h2 className={styles.loginFormTitle}>Login</h2>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <div className={styles.loginFormInputWrapper}>
          <label htmlFor="email" className={styles.loginFormLabel}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={styles.loginFormInput}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.loginFormInputWrapper}>
          <label htmlFor="password" className={styles.loginFormLabel}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={styles.loginFormInput}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.loginFormLoginButton} type="submit">
          Sign In
        </button>
      </form>
      <button className={styles.loginFormRegisterButton}>
        <Link to={'/register'}>Register</Link>
      </button>
    </div>
  );
};
