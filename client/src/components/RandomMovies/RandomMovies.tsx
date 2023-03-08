import styles from './RandomMovies.module.scss';
import { getRandomMovie } from '../../features/movie-slice';
import { useEffect, useRef, useState } from 'react';
import { RandomMovie } from '../RandomMovie/RandomMovie';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { Movie } from '../../types/movie';

export function TrendingMovies() {
  const [randomMovies, setRandomMovies] = useState<Movie[] | null>(null);
  const [slideNumber, setSlideNumber] = useState(0);
  const [distance, setDistance] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getRandomMovie({ size: 10 }))
      .unwrap()
      .then((res) => setRandomMovies(res as Movie[]));
  }, [dispatch]);

  const handleClick = (direction: string) => {
    if (listRef.current) {
      if (direction === 'left' && slideNumber > 0) {
        setSlideNumber(slideNumber - 1);
        listRef.current.style.transform = `translateX(${416 + distance}px)`;
        setDistance(distance + 416);
      }
      if (direction === 'right' && slideNumber < 5) {
        setSlideNumber(slideNumber + 1);
        listRef.current.style.transform = `translateX(${-416 + distance}px)`;
        setDistance(distance - 416);
        setIsMoved(true);
      }
    }
  };

  return (
    <>
      {randomMovies && (
        <div className={styles.trending}>
          <h2 className={styles.trendingTitle}>
            <span className={styles.trendingTitleColored}>Random </span>
            Movies
          </h2>
          <i
            className={styles.trendingLeftArrow + ' fa-solid fa-chevron-left'}
            onClick={() => handleClick('left')}
            style={{ display: !isMoved ? 'none' : 'flex' }}
          ></i>
          <div className={styles.trendingMovies} ref={listRef}>
            {randomMovies.map((movie) => {
              return <RandomMovie movie={movie} key={movie._id} />;
            })}
          </div>
          <i
            className={styles.trendingRightArrow + ' fa-solid fa-chevron-right'}
            onClick={() => handleClick('right')}
          ></i>
        </div>
      )}
    </>
  );
}
