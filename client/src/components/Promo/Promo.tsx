import styles from './Promo.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRandomMovie } from '../../features/movie-slice';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { Movie } from '../../types/movie';

export const Promo = () => {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getRandomMovie({ size: 1 }))
      .unwrap()
      .then((res) => setRandomMovie(res as Movie));
    return setRandomMovie(null);
  }, [dispatch]);

  return (
    <>
      {randomMovie && (
        <Link to={'/movie/' + randomMovie._id}>
          <div className={styles.promo}>
            <div className={styles.promoImgContainer}>
              <img
                className={styles.promoImg}
                src={randomMovie.imgBig}
                alt=""
              />
            </div>
            <div className={styles.promoInfo}>
              <h1 className={styles.promoTitle}>{randomMovie.title}</h1>
              <ul className={styles.promoCategories}>
                {randomMovie.genres.map((genre, i) => {
                  return (
                    <li className={styles.promoCategory} key={i}>
                      {genre}
                    </li>
                  );
                })}
              </ul>
              <div className={styles.promoWatch}>
                <button className={styles.promoButton}>Watch</button>
                <i
                  className={styles.promoInfoIcon + ' fa-solid fa-circle-play'}
                ></i>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};
