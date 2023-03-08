import styles from './TopMovie.module.scss';
import { useState } from 'react';
import { Popup } from '../Popup';
import { Link } from 'react-router-dom';
import { calcAverageFromArr } from '../../utils/calvAvg';
import { Movie } from '../../types/movie';

export const TopMovie = ({ movie }: { movie: Movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  const rating = calcAverageFromArr(movie, 'ratings', 'rating');

  return (
    <Link to={'/movie/' + movie._id}>
      <div className={styles.topMovie}>
        <div className={styles.topMoviePoster}>
          <img src={movie.imgSmall} alt="" className={styles.topMovieImage} />
          <p className={styles.topMovieRating}>{rating}</p>
        </div>

        <div className={styles.topMovieInfo}>
          <p
            className={styles.topMovieInfoTitle}
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
          >
            {movie.title.length > 20
              ? movie.title.substring(0, 20) + '...'
              : movie.title}
          </p>
          <span className={styles.topMovieInfoYear}>{movie.year},</span>
          <span className={styles.topMovieInfoGenre}> {movie.genres[0]}</span>
        </div>
        {isHovered && (
          <Popup setIsHovered={setIsHovered} movie={movie} rating={rating} />
        )}
      </div>
    </Link>
  );
};
