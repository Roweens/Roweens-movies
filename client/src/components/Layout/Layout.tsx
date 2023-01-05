import { Promo } from '../Promo';
import { SidebarList } from '../SidebarList';
import { SidebarMenu } from '../SidebarMenu';
import { TopMovies } from '../TopMovies';
import { TrendingMovies } from '../TrendingMovies';
import styles from './Layout.module.scss';
interface LayoutProps {}

export const Layout = ({}: LayoutProps) => (
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
