import styles from './SearchMovie.module.scss';
import { StarRating } from '../StarRating';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth-slice';

export const SearchMovie = ({ movie }) => {
  const [averageRating, setAverageRating] = useState(0);
  const PF = 'http://localhost:5000/images/';

  useEffect(() => {
    const sumRating = movie.ratings.reduce((prev, next) => prev + next, 0);
    setAverageRating((sumRating / movie.ratings.length).toFixed(1));
  }, [movie.ratings]);

  const user = useSelector(selectUser);

  return (
    <div className={styles.searchMoviesListItem}>
      <div className={styles.searchMoviesListItemMain}>
        <div className={styles.searchMovieListItemMask}>
          <Link to={`/movie/${movie._id}`}>
            <img
              src={PF + movie.imgSmall}
              alt=""
              className={styles.searchMoviesListItemImg}
            />
          </Link>
        </div>
        <div className={styles.searchMoviesListItemMainText}>
          <h5 className={styles.searchMoviesListItemTitle}>
            <Link to={`/movie/${movie._id}`}>{movie.title}</Link>
          </h5>
          <p className={styles.searchMoviesListItemAlt}>
            {`${movie.title + ', '}${movie.year + ', '}${movie.duration} min.`}
          </p>
          <span className={styles.searchMoviesListItemCountry}>
            {movie.country}
          </span>{' '}
          <span className={styles.searchMoviesListItemGenre}>Drama</span>{' '}
          <span className={styles.searchMoviesListItemCreator}>
            Director: {movie.director}{' '}
          </span>
          <p className={styles.searchMoviesListItemActors}>
            Staring: {movie.actors.join(', ')}
          </p>
        </div>
      </div>
      <div className={styles.searchMoviesListItemAdd}>
        <p className={styles.searchMoviesListItemRating}>{averageRating}</p>
        <div className={styles.searchMoviesListItemWatchlist}>
          <i
            className={
              styles.searchMoviesListItemWatchlistIcon +
              ' fa-regular fa-bookmark'
            }
          ></i>
          <p className={styles.searchMoviesListItemWatchlistText}>
            <Link to={!user && '/login'}>Add to watchlist</Link>
          </p>
        </div>
        <div className={styles.searchMoviesListItemWatchlistIcon}>
          <StarRating active={false} id={movie._id} />
        </div>
      </div>
    </div>
  );
};
