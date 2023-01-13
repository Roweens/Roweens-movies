import styles from './SingleMovie.module.scss';
import godzilla from '../../assets/godzillaBig.jpg';
import { StarRating } from '../StarRating';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { getSingleMovie } from '../../features/movie-slice';
import { Loading } from '../Loading';
import { Link } from 'react-router-dom';

export const SingleMovie = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    dispatch(getSingleMovie(location.pathname.split('/')[2]))
      .unwrap()
      .then((res) => {
        setMovie(res.data);
      });
  }, [dispatch, location.pathname]);

  return (
    <>
      {movie ? (
        <div className={styles.singleMovie}>
          <img src={movie.imgBig} alt="" className={styles.singleMovieImage} />
          <div className={styles.singleMovieWrapper}>
            <h2 className={styles.singleMovieTitle}>{movie.title}</h2>
            <h5 className={styles.singleMovieQuote}>{movie.quote}</h5>
            <p className={styles.singleMovieDesc}>{movie.desc}</p>
            <div className={styles.singleMovieStars}>
              <StarRating active={true} id={movie._id} />
            </div>
            <Link to={'/watch'} state={movie}>
              <div className={styles.singleMovieButtonWrapper}>
                <i className={styles.singleMovieIcon + ' fa-solid fa-play'}></i>
                <p className={styles.singleMovieButtonText}>Watch Now</p>
              </div>
            </Link>
            <h5 className={styles.singleMoviePopularTitle}>Popular Movies</h5>
            <div className={styles.singleMoviePopular}>
              <div className={styles.singleMoviePopularItem}>
                <img
                  src={godzilla}
                  alt=""
                  className={styles.singleMoviePopularImg}
                />
              </div>
              <div className={styles.singleMoviePopularItem}>
                <img
                  src={godzilla}
                  alt=""
                  className={styles.singleMoviePopularImg}
                />
              </div>
              <div className={styles.singleMoviePopularItem}>
                <img
                  src={godzilla}
                  alt=""
                  className={styles.singleMoviePopularImg}
                />
              </div>
              <div className={styles.singleMoviePopularItem}>
                <img
                  src={godzilla}
                  alt=""
                  className={styles.singleMoviePopularImg}
                />
              </div>
              <div className={styles.singleMoviePopularItem}>
                <img
                  src={godzilla}
                  alt=""
                  className={styles.singleMoviePopularImg}
                />
              </div>
              <div className={styles.singleMoviePopularItem}>
                <img
                  src={godzilla}
                  alt=""
                  className={styles.singleMoviePopularImg}
                />
              </div>
              <div className={styles.singleMoviePopularItem}>
                <img
                  src={godzilla}
                  alt=""
                  className={styles.singleMoviePopularImg}
                />
              </div>
              <div className={styles.singleMoviePopularItem}>
                <img
                  src={godzilla}
                  alt=""
                  className={styles.singleMoviePopularImg}
                />
              </div>
              <div className={styles.singleMoviePopularItem}>
                <img
                  src={godzilla}
                  alt=""
                  className={styles.singleMoviePopularImg}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
