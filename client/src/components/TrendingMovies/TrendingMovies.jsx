import styles from './Trending.module.scss';

import { useRef, useState } from 'react';
import { TrendingMovie } from '../TrendingMovie';

export function TrendingMovies() {
  const [slideNumber, setSlideNumber] = useState(0);
  const [distance, setDistance] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const listRef = useRef();

  const handleClick = (direction) => {
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
  };

  return (
    <div className={styles.trending} data-testid="Trending">
      <h2 className={styles.trendingTitle}>
        <span className={styles.trendingTitleColored}>Trending </span>
        Movies
      </h2>
      <i
        className={styles.trendingLeftArrow + ' fa-solid fa-chevron-left'}
        onClick={() => handleClick('left')}
        style={{ display: !isMoved ? 'none' : 'flex' }}
      ></i>
      <div className={styles.trendingMovies} ref={listRef}>
        <TrendingMovie />
        <TrendingMovie />
        <TrendingMovie />
        <TrendingMovie />
        <TrendingMovie />
        <TrendingMovie />
        <TrendingMovie />
        <TrendingMovie />
        <TrendingMovie />
        <TrendingMovie />
        <TrendingMovie />
      </div>
      <i
        className={styles.trendingRightArrow + ' fa-solid fa-chevron-right'}
        onClick={() => handleClick('right')}
      ></i>
    </div>
  );
}
