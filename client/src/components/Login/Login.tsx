import styles from './Login.module.scss';
import bg from '../../assets/background.jpg';
import { LoginForm } from '../LoginForm';

export const Login = () => (
  <div className={styles.login}>
    <img src={bg} alt="" className={styles.loginBackground} />
    <div className={styles.loginFormWrapper}>
      <LoginForm />
    </div>
  </div>
);
