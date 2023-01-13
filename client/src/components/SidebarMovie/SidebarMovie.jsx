import styles from './SidebarMovie.module.scss';
import batman from '../../assets/batman.jpg';
import { Link } from 'react-router-dom';

export const SidebarMovie = ({ movie }) => {
  console.log(movie);
  console.log();
  return (
    <>
      {movie && (
        <Link to={'/movie'}>
          <div className={styles.sidebarMovie}>
            <div className={styles.sidebarMoviePoster}>
              <img
                src={movie.imgSmall}
                alt=""
                className={styles.sidebarMovieImage}
              />
            </div>
            <div className={styles.sidebarMovieInfo}>
              <h5 className={styles.sidebarMovieInfoTitle}>
                {' '}
                {movie.title} ({movie.year})
              </h5>
              {movie.genres.map((genre) => {
                return (
                  <span className={styles.sidebarMovieInfoGenres}>{genre}</span>
                );
              })}
            </div>
          </div>
        </Link>
      )}
    </>
  );
};
