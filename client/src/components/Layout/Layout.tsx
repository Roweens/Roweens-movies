import { Promo } from '../Promo';
import { SidebarList } from '../SidebarList';
import { SidebarMenu } from '../SidebarMenu';
import { TopMovies } from '../TopMovies';
import { TrendingMovies } from '../RandomMovies';
import styles from './Layout.module.scss';

export const Layout = () => (
  <div className={styles.homeContainer}>
    <SidebarMenu />
    <div className={styles.layout}>
      <Promo />
      <TrendingMovies />
      <TopMovies />
    </div>
    <SidebarList />
  </div>
);
