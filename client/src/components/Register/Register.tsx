import styles from './Register.module.scss';

import bg from '../../assets/background.jpg';

import { RegisterForm } from '../RegisterForm';

export const Register = () => (
  <div className={styles.register}>
    <img src={bg} alt="" className={styles.registerBackground} />
    <div className={styles.registerFormWrapper}>
      <RegisterForm />
    </div>
  </div>
);
