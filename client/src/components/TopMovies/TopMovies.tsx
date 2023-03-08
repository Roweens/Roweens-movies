import { useEffect, useState } from 'react';
import { getRandomMovie } from '../../features/movie-slice';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { Movie } from '../../types/movie';
import { TopMovie } from '../TopMovie/TopMovie';
import styles from './TopMovies.module.scss';

export const TopMovies = () => {
  const dispatch = useTypedDispatch();
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[] | null>(null);

  useEffect(() => {
    dispatch(getRandomMovie({ size: 9, param: 'toprated' }))
      .unwrap()
      .then((res) => {
        setTopRatedMovies(res as Movie[]);
      });
  }, [dispatch]);

  return (
    <>
      {topRatedMovies && (
        <div className={styles.topMovies}>
          <h2 className={styles.topMoviesTitle}>
            <span className={styles.topMoviesColored}>Top </span>
            Rated Movies
          </h2>
          <div className={styles.topMoviesWrapper}>
            {topRatedMovies.map((movie, i) => {
              return (
                <TopMovie movie={movie} key={i + Date.now() + movie!._id!} />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
