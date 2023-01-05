import styles from './Promo.module.scss';
import { Link } from 'react-router-dom';

export const Promo = () => (
  <Link to={'/movie'}>
    <div className={styles.promo}>
      <h1 className={styles.promoTitle}>Godzilla</h1>
      <ul className={styles.promoCategories}>
        <li className={styles.promoCategory}>Action</li>
        <li className={styles.promoCategory}>Adventure</li>
      </ul>
      <div className={styles.promoWatch}>
        <button className={styles.promoButton}>Watch</button>
        <i className={styles.promoInfoIcon + ' fa-solid fa-circle-play'}></i>
      </div>
    </div>
  </Link>
);
