import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth-slice';
import { SidebarMovie } from '../SidebarMovie';
import styles from './SidebarList.module.scss';

export const SidebarList = () => {
  const user = useSelector(selectUser);

  return (
    <div className={styles.sidebarList}>
      <div className={styles.sidebarListWrapper}>
        <div className={styles.sidebarListCategory}>
          <h2 className={styles.sidebarListCategoryTitle}>Continue watching</h2>
          <SidebarMovie />
          <SidebarMovie />
          <SidebarMovie />
        </div>
        <div className={styles.sidebarListLine}></div>
        <div className={styles.sidebarListCategory}>
          <h2 className={styles.sidebarListCategoryTitle}>Watchlist</h2>
          {user.watchlist
            .slice(user.watchlist.length - 4, user.watchlist.length)
            .map((movie) => {
              return <SidebarMovie movie={movie} />;
            })}
        </div>
      </div>
    </div>
  );
};
