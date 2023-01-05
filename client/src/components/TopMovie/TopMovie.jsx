import styles from './TopMovie.module.scss';
import club from '../../assets/club.png';
import { useState } from 'react';
import { Popup } from '../Popup';
import { Link } from 'react-router-dom';
export const TopMovie = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={'/movie'}>
      <div className={styles.topMovie}>
        <div className={styles.topMoviePoster}>
          <img src={club} alt="" className={styles.topMovieImage} />
          <p className={styles.topMovieRating}>9.7</p>
        </div>

        <div className={styles.topMovieInfo}>
          <p
            className={styles.topMovieInfoTitle}
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
          >
            Fight Club
          </p>
          <span className={styles.topMovieInfoYear}>2077,</span>
          <span className={styles.topMovieInfoGenre}> Drama</span>
        </div>
        {isHovered && <Popup setIsHovered={setIsHovered} />}
      </div>
    </Link>
  );
};
