import styles from './SingleMovie.module.scss';
import { StarRating } from '../StarRating';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getRandomMovie, getSingleMovie } from '../../features/movie-slice';
import { Loading } from '../Loading';
import { Link } from 'react-router-dom';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { Movie } from '../../types/movie';

export const SingleMovie = () => {
  const dispatch = useTypedDispatch();
  const location = useLocation();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [others, setOthers] = useState<Movie[] | null>(null);

  useEffect(() => {
    dispatch(getSingleMovie(location.pathname.split('/')[2]))
      .unwrap()
      .then((res) => {
        setMovie(res);
      });

    dispatch(getRandomMovie({ size: 9 }))
      .unwrap()
      .then((res) => setOthers(res as Movie[]));
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
              <StarRating active={true} id={movie!._id!} />
            </div>
            <Link to={'/watch'} state={movie}>
              <div className={styles.singleMovieButtonWrapper}>
                <i className={styles.singleMovieIcon + ' fa-solid fa-play'}></i>
                <p className={styles.singleMovieButtonText}>Watch Now</p>
              </div>
            </Link>
            <h5 className={styles.singleMoviePopularTitle}>Popular Movies</h5>
            <div className={styles.singleMoviePopular}>
              {others ? (
                others.map((movie) => {
                  return (
                    <div
                      className={styles.singleMoviePopularItem}
                      key={movie!._id! + Date.now()}
                    >
                      <img
                        src={movie.imgSmall}
                        alt=""
                        className={styles.singleMoviePopularImg}
                      />
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
