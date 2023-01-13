import styles from './Promo.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRandomMovie } from '../../features/movie-slice';

export const Promo = () => {
  const [randomMovie, setRandomMovie] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomMovie())
      .unwrap()
      .then((res) => setRandomMovie(res.data[0]));

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
