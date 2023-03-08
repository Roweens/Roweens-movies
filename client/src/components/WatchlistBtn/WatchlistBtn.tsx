import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  handleWatchlistAdd,
  handleWatchlistDelete,
  selectUser,
} from '../../features/auth-slice';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Movie } from '../../types/movie';
import styles from './WatchlistBtn.module.scss';

interface WatchlistProps {
  movie: Movie;
}

export const WatchlistBtn = ({ movie }: WatchlistProps) => {
  const dispatch = useTypedDispatch();
  const [watchlisted, setWatchlisted] = useState(false);
  const user = useTypedSelector(selectUser);

  useEffect(() => {
    if (user && user.watchlist) {
      if (user.watchlist.find((watch) => watch._id === movie._id)) {
        setWatchlisted(true);
      }
    }
  }, [movie._id, user]);

  const handleWatchlist = () => {
    if (user) {
      if (watchlisted) {
        dispatch(
          handleWatchlistDelete({ movieId: movie._id!, userId: user._id })
        )
          .then(() => {
            toast.success(movie.title + ' removed from watchlist');
          })
          .catch(() => {
            toast.error('Something went wrong');
          });
        setWatchlisted(false);
      } else {
        dispatch(handleWatchlistAdd({ movieId: movie._id!, userId: user._id }))
          .then(() => {
            toast.success(movie.title + ' was added to watchlist');
          })
          .catch(() => {
            toast.error('Something went wrong');
          });
      }
    }
  };

  return (
    <div className={styles.watchlistBtn}>
      {watchlisted ? (
        <i className={styles.watchlistIcon + ' fa-solid fa-bookmark'}></i>
      ) : (
        <i className={styles.watchlistIcon + ' fa-regular fa-bookmark'}></i>
      )}

      <Link to={!user ? '/login' : ''}>
        <p className={styles.watchlistText} onClick={handleWatchlist}>
          Add to watchlist
        </p>
      </Link>
    </div>
  );
};
