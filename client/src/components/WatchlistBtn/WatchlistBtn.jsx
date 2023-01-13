import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  handleWatchlistAdd,
  handleWatchlistDelete,
} from '../../features/auth-slice';
import styles from './WatchlistBtn.module.scss';

export const WatchlistBtn = ({ movie, user }) => {
  const dispatch = useDispatch();
  const [watchlisted, setWatchlisted] = useState(false);

  useEffect(() => {
    if (user.watchlist.find((watch) => watch._id === movie._id)) {
      setWatchlisted(true);
    }
  }, [movie._id, user.watchlist]);

  const handleWatchlist = () => {
    if (watchlisted) {
      dispatch(handleWatchlistDelete({ movieId: movie._id, userId: user._id }));
      setWatchlisted(false);
    } else {
      dispatch(handleWatchlistAdd({ movieId: movie._id, userId: user._id }));
    }
  };

  return (
    <div className={styles.watchlistBtn}>
      {watchlisted ? (
        <i className={styles.watchlistIcon + ' fa-solid fa-bookmark'}></i>
      ) : (
        <i className={styles.watchlistIcon + ' fa-regular fa-bookmark'}></i>
      )}

      <Link to={!user && '/login'}>
        <p className={styles.watchlistText} onClick={handleWatchlist}>
          Add to watchlist
        </p>
      </Link>
    </div>
  );
};
