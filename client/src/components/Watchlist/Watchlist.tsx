import { useEffect, useState } from 'react';
import { selectUser } from '../../features/auth-slice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Movie } from '../../types/movie';
import { TopMovie } from '../TopMovie';
import styles from './Watchlist.module.scss';

export const Watchlist = () => {
  const user = useTypedSelector(selectUser);
  const [showMore, setShowMore] = useState(false);
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[] | null>(null);

  useEffect(() => {
    if (user && user.watchlist) {
      setWatchlistMovies(user.watchlist.slice(0, 5));
    }
  }, [user]);

  const handleShowMore = () => {
    if (user && user.watchlist) {
      !showMore
        ? setWatchlistMovies(user.watchlist)
        : setWatchlistMovies(user.watchlist.slice(0, 5));
      setShowMore(!showMore);
    }
  };

  return (
    <>
      {user && (
        <div className={styles.watchlist}>
          <h5 className={styles.watchlistTitle}>Watchlist</h5>
          {watchlistMovies && user.watchlist ? (
            <div className={styles.watchlistList}>
              {watchlistMovies.map((item) => {
                return <TopMovie movie={item} />;
              })}
            </div>
          ) : (
            <h5>No movies in watchlist</h5>
          )}
          <button className={styles.watchlistButton} onClick={handleShowMore}>
            {!showMore ? 'Show More...' : 'Hide'}
          </button>
        </div>
      )}
    </>
  );
};
