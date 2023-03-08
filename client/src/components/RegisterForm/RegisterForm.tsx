import styles from './RegisterForm.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { handleSignUp } from '../../features/auth-slice';
import { CustomInput } from '../UI/CustomInput';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { toast } from 'react-toastify';

type RegisterUser = {
  email: string;
  username: string;
  password: string;
};

export const RegisterForm = () => {
  const [user, setUser] = useState<RegisterUser | null>(null);
  const dispatch = useTypedDispatch();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      dispatch(handleSignUp(user))
        .unwrap()
        .then(() => {
          window.location.replace('/login');
          toast.success('Sign up successful');
        })
        .catch(() => toast.error('Sign up failed'));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | File) => {
    if (!(e instanceof File)) {
      setUser({ ...(user as RegisterUser), [e.target.name]: e.target.value });
    }
  };
  return (
    <div className={styles.registerFormWrapper}>
      <h2 className={styles.registerFormTitle}>Register</h2>
      <form className={styles.registerForm} onSubmit={handleRegister}>
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
          type="text"
          id="username"
          name="username"
          label="true"
          labelContent="Username"
          placeholder="Enter your username"
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
