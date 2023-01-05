import styles from './RegisterForm.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { handleSignUp } from '../../features/auth-slice';
import { useDispatch } from 'react-redux';
export const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(
      handleSignUp({ username: username, email: email, password: password })
    )
      .unwrap()
      .then(() => window.location.replace('/login'));
  };

  return (
    <div className={styles.registerFormWrapper}>
      <h2 className={styles.registerFormTitle}>Register</h2>
      <form className={styles.registerForm} onSubmit={handleRegister}>
        <div className={styles.registerFormInputWrapper}>
          <label htmlFor="email" className={styles.registerFormLabel}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={styles.registerFormInput}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.registerFormInputWrapper}>
          <label htmlFor="username" className={styles.registerFormLabel}>
            User Name
          </label>
          <input
            type="username"
            id="username"
            className={styles.registerFormInput}
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.registerFormInputWrapper}>
          <label htmlFor="password" className={styles.registerFormLabel}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={styles.registerFormInput}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.registerFormRegisterButton} type="submit">
          Sign Up
        </button>
      </form>
      <button className={styles.registerFormLoginButton}>
        <Link to={'/login'}>Login</Link>
      </button>
    </div>
  );
};
