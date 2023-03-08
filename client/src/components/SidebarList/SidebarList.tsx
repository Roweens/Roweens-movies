import { selectUser } from '../../features/auth-slice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { SidebarMovie } from '../SidebarMovie';
import styles from './SidebarList.module.scss';

export const SidebarList = () => {
  const user = useTypedSelector(selectUser);

  return (
    <div className={styles.sidebarList}>
      <div className={styles.sidebarListWrapper}>
        <div className={styles.sidebarListCategory}>
          <h2 className={styles.sidebarListCategoryTitle}>Watchlist</h2>
          <div className={styles.sidebarListLine}></div>
          {user && user.watchlist && user.watchlist.length ? (
            user.watchlist
              .slice(user.watchlist.length - 5, user.watchlist.length)
              .map((movie, i) => {
                return (
                  <SidebarMovie
                    movie={movie}
                    key={movie!._id! + Date.now() + i}
                  />
                );
              })
          ) : (
            <h5 className={styles.sidebarListWarning}>
              No movies in your watchlist yet. Add one!
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};
