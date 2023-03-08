import styles from './SidebarMovie.module.scss';

import { Link } from 'react-router-dom';
import { Movie } from '../../types/movie';

export const SidebarMovie = ({ movie }: { movie: Movie }) => {
  return (
    <>
      {movie && (
        <Link to={'/movie/' + movie._id}>
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
              {movie.genres.map((genre, i) => {
                return (
                  <span
                    className={styles.sidebarMovieInfoGenres}
                    key={movie!._id! + movie.createdAt + i}
                  >
                    {genre}
                  </span>
                );
              })}
            </div>
          </div>
        </Link>
      )}
    </>
  );
};
