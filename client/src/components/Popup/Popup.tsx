import styles from './Popup.module.scss';
import { Link } from 'react-router-dom';
import { Movie } from '../../types/movie';

interface PopupProps {
  setIsHovered: (arg: boolean) => void;
  movie: Movie;
  rating: number;
}

export const Popup = ({ setIsHovered, movie, rating }: PopupProps) => (
  <div
    className={styles.popup}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <div className={styles.popupWrapper}>
      <div className={styles.popupPoster}>
        <img src={movie.imgSmall} alt="" className={styles.popupPosterImage} />
        <span className={styles.popupPosterRating}>{rating}</span>
      </div>
      <div className={styles.popupInfo}>
        <p className={styles.popupInfoTitle}>
          {' '}
          {movie.title.length > 16
            ? movie.title.substring(0, 16) + '...'
            : movie.title}
        </p>
        <p className={styles.popupInfoAlt}>
          {movie.title}, {movie.year}
        </p>
        <div className={styles.popupInfoButtons}>
          <Link to={'/movie/' + movie._id}>
            <button className={styles.popupInfoWatchButton}>Watch</button>
          </Link>
        </div>
        <p className={styles.popupInfoActors}>
          Starring: <span>{movie.actors[0]}</span>
        </p>
        <p className={styles.popupInfoCreators}>Director: {movie.director}</p>
      </div>
    </div>
  </div>
);
