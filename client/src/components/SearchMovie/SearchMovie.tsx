import styles from './SearchMovie.module.scss';
import { StarRating } from '../StarRating';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { selectUser } from '../../features/auth-slice';
import { WatchlistBtn } from '../WatchlistBtn';
import { calcAverageFromArr } from '../../utils/calvAvg';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Movie } from '../../types/movie';

export const SearchMovie = ({ movie }: { movie: Movie }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [currentUserRating, setCurrentUserRating] = useState<number | null>(
    null
  );

  const ratingRef = useRef<HTMLParagraphElement>(null);
  const user = useTypedSelector(selectUser);

  useEffect(() => {
    const avgRating = calcAverageFromArr(movie, 'ratings', 'rating');

    setAverageRating(avgRating);

    if (!isNaN(avgRating) && ratingRef.current) {
      avgRating >= 7
        ? (ratingRef.current.style.backgroundColor = 'darkgreen')
        : avgRating >= 4
        ? (ratingRef.current.style.backgroundColor = 'orange')
        : avgRating > 0
        ? (ratingRef.current.style.backgroundColor = 'darkred')
        : (ratingRef.current.style.backgroundColor = 'unset');
    }

    const rating = movie.ratings.find(
      (rating) => rating.username === user?._id
    );
    rating && setCurrentUserRating(rating.rating);
  }, [movie.ratings, user?._id, movie]);

  return (
    <div className={styles.searchMoviesListItem}>
      <div className={styles.searchMoviesListItemMain}>
        <div className={styles.searchMovieListItemMask}>
          <Link to={`/movie/${movie._id}`}>
            <img
              src={movie.imgSmall}
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
          <div className={styles.searchMoviesListItemGenres}>
            {movie.genres.map((genre, i) => {
              return (
                <span className={styles.searchMoviesListItemGenre} key={i}>
                  {genre}
                </span>
              );
            })}
          </div>
          <span className={styles.searchMoviesListItemCreator}>
            Director: {movie.director}{' '}
          </span>
          <p className={styles.searchMoviesListItemActors}>
            Staring: {movie.actors.join(', ')}
          </p>
        </div>
      </div>

      <div className={styles.searchMoviesListItemAdd}>
        <div className={styles.searchMoviesListItemAddButtons}>
          <p className={styles.searchMoviesListItemRating} ref={ratingRef}>
            {!isNaN(averageRating) ? averageRating : 'No rating'}
          </p>
          <WatchlistBtn movie={movie} />
          <div className={styles.searchMoviesListItemWatchlistIcon}>
            <StarRating
              active={false}
              id={movie!._id!}
              ratings={movie.ratings}
            />
          </div>
        </div>
        <div className={styles.searchMoviesListItemUserRating}>
          {currentUserRating ? (
            <p>
              You rated is as <span>{currentUserRating}</span>
            </p>
          ) : (
            <p>You didn't rate this movie yet</p>
          )}
        </div>
      </div>
    </div>
  );
};
