import styles from './LoginForm.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { handleSignIn } from '../../features/auth-slice';
import { CustomInput } from '../UI/CustomInput';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { toast } from 'react-toastify';

type LoginUser = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const [user, setUser] = useState<LoginUser | null>(null);
  const dispatch = useTypedDispatch();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user !== null) {
      dispatch(handleSignIn(user))
        .unwrap()
        .then(() => toast.success('Sign in successful'))
        .catch((err: string) => {
          toast.error('Sign in failed');
          console.log(err);
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | File) => {
    if (!(e instanceof File)) {
      if (e.target.name === 'email' || e.target.name === 'password') {
        setUser({ ...(user as LoginUser), [e.target.name]: e.target.value });
      }
    }
  };

  return (
    <div className={styles.loginFormWrapper}>
      <h2 className={styles.loginFormTitle}>Login</h2>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <CustomInput
          type="email"
          id="email"
          name="email"
          label="true"
          labelContent="Email"
          placeholder="Enter your email"
          onChange={handleChange}
        />
        <CustomInput
          type="password"
          id="password"
          name="password"
          label="true"
          labelContent="Password"
          placeholder="Enter your password"
          onChange={handleChange}
        />
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
