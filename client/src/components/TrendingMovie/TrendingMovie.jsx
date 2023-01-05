import styles from './TrendingMovie.module.scss';
import vikings from '../../assets/vikings.jpg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const TrendingMovie = () => {
  return (
    <Link to={'/movie'}>
      <div className={styles.trendingMovie}>
        <img src={vikings} alt="" className={styles.trendingMoviePoster} />
        <div className={styles.trendingMovieInfo}>
          <p className={styles.trendingMovieRating}>7.5</p>
          <div className={styles.trendingMovieInfoBlock}>
            <h5 className={styles.trendingMovieInfoTitle}>The Vikings</h5>
            <div className={styles.trendingMovieInfoSeparated}>
              <p className={styles.trendingMovieInfoDate}>2015</p>
              <p className={styles.trendingMovieInfoGenre}>History</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
