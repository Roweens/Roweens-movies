import styles from './Popup.module.scss';
import club from '../../assets/club.png';

export const Popup = ({ setIsHovered }) => (
  <div
    className={styles.popup}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <div className={styles.popupWrapper}>
      <div className={styles.popupPoster}>
        <img src={club} alt="" className={styles.popupPosterImage} />
        <span className={styles.popupPosterRating}>7.5</span>
      </div>
      <div className={styles.popupInfo}>
        <p className={styles.popupInfoTitle}>Бойцовский клуб</p>
        <p className={styles.popupInfoAlt}>Fight Club, 2077</p>
        <div className={styles.popupInfoButtons}>
          <button className={styles.popupInfoWatchButton}>Watch</button>
          <button className={styles.popupInfoAddButton}>
            <i className={styles.popupIcon + ' fa-regular fa-bookmark'}></i>
          </button>
        </div>
        <p className={styles.popupInfoActors}>
          В главных ролях: <span>Жириновский</span>
        </p>
        <p className={styles.popupInfoCreators}>Режиссер: Джейм Кэмерон</p>
      </div>
    </div>
  </div>
);
