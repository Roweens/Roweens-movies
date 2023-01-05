import { TopMovie } from '../TopMovie/TopMovie';
import styles from './TopMovies.module.scss';

export const TopMovies = () => (
  <div className={styles.topMovies}>
    <h2 className={styles.topMoviesTitle}>
      <span className={styles.topMoviesColored}>Top </span>
      Rated Movies
    </h2>
    <div className={styles.topMoviesWrapper}>
      <TopMovie />
      <TopMovie />
      <TopMovie />
      <TopMovie />
      <TopMovie />
      <TopMovie />
      <TopMovie />
      <TopMovie />
      <TopMovie />
      <TopMovie />
      <TopMovie />
      <TopMovie />
    </div>
  </div>
);
