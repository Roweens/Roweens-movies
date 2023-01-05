import styles from './SidebarMovie.module.scss';
import batman from '../../assets/batman.jpg';
import { Link } from 'react-router-dom';

export const SidebarMovie = () => (
  <Link to={'/movie'}>
    <div className={styles.sidebarMovie}>
      <div className={styles.sidebarMoviePoster}>
        <img src={batman} alt="" className={styles.sidebarMovieImage} />
      </div>
      <div className={styles.sidebarMovieInfo}>
        <h5 className={styles.sidebarMovieInfoTitle}>The Dark Knight (2077)</h5>
        <p className={styles.sidebarMovieInfoGenres}>Thriller, Detective</p>
      </div>
    </div>
  </Link>
);
