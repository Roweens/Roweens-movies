import styles from './Header.module.scss';
import avatar from '../../assets/avatar.png';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { Link } from 'react-router-dom';
import { selectUser } from '../../features/auth-slice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { BurgerMenu } from '../UI/burgerMenu';

export const Header = () => {
  const user = useTypedSelector(selectUser);

  return (
    <div className={styles.header}>
      <BurgerMenu />
      <div className={styles.headerLogo}>
        <Link to={'/'}>
          <h1 className={styles.headerLogoText}>
            Roweens
            <span className={styles.headerLogoTextDecorated}> Movies</span>
          </h1>
        </Link>
      </div>
      <div className={styles.headerNavbar}>
        <ul className={styles.headerNavbarList}>
          <Link to={'/search/'}>
            {' '}
            <li className={styles.headerNavbarListItem}>All</li>
          </Link>
          <Link to={'/search/?type=movie'}>
            {' '}
            <li className={styles.headerNavbarListItem}>Movies</li>
          </Link>

          <Link to={'/search/?type=series'}>
            <li className={styles.headerNavbarListItem}>TV Series</li>
          </Link>
          <Link to={'/search/?type=anime'}>
            <li className={styles.headerNavbarListItem}>Anime</li>
          </Link>
        </ul>
      </div>
      <div className={styles.headerInfo}>
        <ThemeSwitcher />
        <Link to={'/search'}>
          <i
            className={styles.headerInfoIcon + ' fa-solid fa-magnifying-glass'}
          ></i>
        </Link>
        <i className={styles.headerInfoIcon + ' fa-solid fa-bell'}></i>
        {user ? (
          <div className={styles.headerInfoAvatar}>
            <img
              src={user.profilePic ? user.profilePic : avatar}
              alt=""
              className={styles.headerInfoPhoto}
            />
            <Link to={`/user/${user._id}`}>
              <p className={styles.headerInfoName}>{user.username}</p>
            </Link>
          </div>
        ) : (
          <p className={styles.headerInfoName}>
            <Link to={'/login'}>Login</Link>
          </p>
        )}
      </div>
    </div>
  );
};
