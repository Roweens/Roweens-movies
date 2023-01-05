import { SidebarMovie } from '../SidebarMovie';
import styles from './SidebarList.module.scss';

export const SidebarList = () => (
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
        <SidebarMovie />
        <SidebarMovie />
        <SidebarMovie />
      </div>
    </div>
  </div>
);
