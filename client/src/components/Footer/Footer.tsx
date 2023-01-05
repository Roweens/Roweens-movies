import styles from './Footer.module.scss';

export const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.footerIcons}>
      <i className={styles.footerIcon + ' fa-brands fa-youtube'}></i>
      <i className={styles.footerIcon + ' fa-brands fa-telegram'}></i>
      <i className={styles.footerIcon + ' fa-brands fa-twitter'}></i>
      <i className={styles.footerIcon + ' fa-brands fa-square-facebook'}></i>
    </div>
    <ul className={styles.footerNavbar}>
      <li className={styles.footerNavbarItem}>Privacy Policy</li>
      <li className={styles.footerNavbarItem}>Conditions of Use</li>
      <li className={styles.footerNavbarItem}>Help</li>
      <li className={styles.footerNavbarItem}>Contacts</li>
      <li className={styles.footerNavbarItem}>Advertising</li>
    </ul>
    <div className={styles.footerLine}></div>
    <div className={styles.footerOwnership}>
      <p className={styles.footerOwnershipDate}>
        © 2022 — 2023, Roweens Movies
      </p>
      <a href="#" className={styles.footerOwnershipLink}>
        GitHub Repo
      </a>
    </div>
  </div>
);
