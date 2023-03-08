import styles from './RandomMovie.module.scss';

import { Link } from 'react-router-dom';
import { calcAverageFromArr } from '../../utils/calvAvg';
import { Movie } from '../../types/movie';

export const RandomMovie = ({ movie }: { movie: Movie }) => {
  const rating = calcAverageFromArr(movie, 'ratings', 'rating');

  return (
    <div className={styles.trendingMovie}>
      <img src={movie.imgBig} alt="" className={styles.trendingMoviePoster} />
      <Link to={'/movie/' + movie._id}>
        <div className={styles.trendingMovieInfo}>
          <p className={styles.trendingMovieRating}>
            {!isNaN(rating) ? rating : 'No rating'}
          </p>
          <div className={styles.trendingMovieInfoBlock}>
            <h5 className={styles.trendingMovieInfoTitle}>
              {movie.title.length > 20
                ? movie.title.substring(0, 20) + '...'
                : movie.title}
            </h5>
            <div className={styles.trendingMovieInfoSeparated}>
              <p className={styles.trendingMovieInfoDate}>{movie.year}</p>
              {movie.genres.slice(0, 3).map((genre, i) => {
                return (
                  <p
                    className={styles.trendingMovieInfoGenre}
                    key={movie!._id! + i + movie.updatedAt}
                  >
                    {genre}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
