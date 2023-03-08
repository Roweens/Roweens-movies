import styles from './SidebarMenu.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { removeUser, selectUser } from '../../features/auth-slice';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';

export const SidebarMenu = () => {
  const dispatch = useTypedDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(removeUser());
  };

  return (
    <div className={styles.sidebarMenu} data-testid="SidebarMenu">
      <div className={styles.sidebarMenuWrapper}>
        <div className={styles.sibebarMenuMain}>
          <p className={styles.sibebarMenuTitle}>Menu</p>
          <ul className={styles.sibebarMenuList}>
            <li className={styles.sibebarMenuItem}>
              <Link to={'/search'}>
                <i
                  className={styles.sidebarMenuIcon + ' fa-solid fa-compass'}
                ></i>
                <span className={styles.sibebarMenuItemText}>Browse</span>
              </Link>
            </li>
            <li className={styles.sibebarMenuItem}>
              <i
                className={styles.sidebarMenuIcon + ' fa-solid fa-circle-play'}
              ></i>
              <span className={styles.sibebarMenuItemText}>Watchlist</span>
            </li>
          </ul>
        </div>
        {user && (
          <div className={styles.sidebarMenuSocial}>
            <p className={styles.sibebarMenuTitle}>Social</p>
            <ul className={styles.sibebarMenuList}>
              <li className={styles.sibebarMenuItem}>
                <Link to={`/user/${user._id}`}>
                  <i
                    className={styles.sidebarMenuIcon + ' fa-solid fa-gear'}
                  ></i>
                  <span className={styles.sibebarMenuItemText}>Settings</span>
                </Link>
              </li>
              <li className={styles.sibebarMenuItem} onClick={handleLogout}>
                <i
                  className={
                    styles.sidebarMenuIcon + ' fa-solid fa-right-from-bracket'
                  }
                ></i>
                <span className={styles.sibebarMenuItemText}>Logout</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
