import { useState } from 'react';
import { Link } from 'react-router-dom';
import { removeUser, selectUser } from '../../../features/auth-slice';
import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import styles from './burgerMenu.module.scss';

export const BurgerMenu = () => {
  const [active, setActive] = useState(false);
  const dispatch = useTypedDispatch();
  const disabled = active ? styles.disabled : '';
  const user = useTypedSelector(selectUser);

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(removeUser());
    setActive(false);
  };

  return (
    <>
      {active ? (
        <div className={styles.burgerMenu}>
          <i
            className={styles.burgerMenuIcon + ' fa-solid fa-xmark'}
            onClick={() => setActive(false)}
          ></i>
          <div className={styles.Navbar}>
            <ul className={styles.NavbarList}>
              <Link to={'/'} onClick={() => setActive(false)}>
                <li className={styles.NavbarListItem}>Home</li>
              </Link>
              <Link to={'/search/'} onClick={() => setActive(false)}>
                <li className={styles.NavbarListItem}>All</li>
              </Link>
              <Link to={'/search/?type=movie'} onClick={() => setActive(false)}>
                <li className={styles.NavbarListItem}>Movies</li>
              </Link>
              <Link
                to={'/search/?type=series'}
                onClick={() => setActive(false)}
              >
                <li className={styles.NavbarListItem}>Series</li>
              </Link>
              <Link to={'/search/?type=anime'} onClick={() => setActive(false)}>
                <li className={styles.NavbarListItem}>Anime</li>
              </Link>
              {user ? (
                <>
                  <Link
                    to={`/user/${user._id}`}
                    onClick={() => setActive(false)}
                  >
                    <li className={styles.NavbarListItem}>My profile</li>
                  </Link>
                  <li className={styles.NavbarListItem} onClick={handleLogout}>
                    Logout
                  </li>
                </>
              ) : (
                ''
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div
          className={`${styles.burgerIcon} ${disabled}`}
          onClick={() => setActive(true)}
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </div>
      )}
    </>
  );
};
