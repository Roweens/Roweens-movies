import { useEffect, useState } from 'react';
import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className={styles.themeSwitcher}>
      <li className={styles.sibebarMenuItem} onClick={() => setIsDark(!isDark)}>
        {isDark ? (
          <i className={styles.sidebarMenuIcon + ' fa-solid fa-moon'}></i>
        ) : (
          <i className={styles.sidebarMenuIcon + ' fa-solid fa-sun'}></i>
        )}

        <span className={styles.sibebarMenuItemText}>Switch Theme</span>
      </li>
    </div>
  );
};
