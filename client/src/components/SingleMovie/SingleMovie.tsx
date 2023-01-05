import styles from './SingleMovie.module.scss';
import godzilla from '../../assets/godzillaBig.jpg';
import { StarRating } from '../StarRating';
interface SingleMovieProps {}

export const SingleMovie = ({}: SingleMovieProps) => (
  <div className={styles.singleMovie}>
    <img src={godzilla} alt="" className={styles.singleMovieImage} />
    <div className={styles.singleMovieWrapper}>
      <h2 className={styles.singleMovieTitle}>Godzilla</h2>
      <h5 className={styles.singleMovieQuote}>King of the monsters</h5>
      <p className={styles.singleMovieDesc}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam minus
        consequuntur aut nesciunt? At deserunt enim mollitia deleniti illo unde
        quidem consequatur, iusto non ullam quae id sit sed tenetur!
      </p>
      <div className={styles.singleMovieStars}>
        <StarRating active={true} />
      </div>

      <div className={styles.singleMovieButtonWrapper}>
        <i className={styles.singleMovieIcon + ' fa-solid fa-play'}></i>
        <p className={styles.singleMovieButtonText}>Watch Now</p>
      </div>
      <h5 className={styles.singleMoviePopularTitle}>Popular Movies</h5>
      <div className={styles.singleMoviePopular}>
        <div className={styles.singleMoviePopularItem}>
          <img src={godzilla} alt="" className={styles.singleMoviePopularImg} />
        </div>
        <div className={styles.singleMoviePopularItem}>
          <img src={godzilla} alt="" className={styles.singleMoviePopularImg} />
        </div>
        <div className={styles.singleMoviePopularItem}>
          <img src={godzilla} alt="" className={styles.singleMoviePopularImg} />
        </div>
        <div className={styles.singleMoviePopularItem}>
          <img src={godzilla} alt="" className={styles.singleMoviePopularImg} />
        </div>
        <div className={styles.singleMoviePopularItem}>
          <img src={godzilla} alt="" className={styles.singleMoviePopularImg} />
        </div>
        <div className={styles.singleMoviePopularItem}>
          <img src={godzilla} alt="" className={styles.singleMoviePopularImg} />
        </div>
        <div className={styles.singleMoviePopularItem}>
          <img src={godzilla} alt="" className={styles.singleMoviePopularImg} />
        </div>
        <div className={styles.singleMoviePopularItem}>
          <img src={godzilla} alt="" className={styles.singleMoviePopularImg} />
        </div>
        <div className={styles.singleMoviePopularItem}>
          <img src={godzilla} alt="" className={styles.singleMoviePopularImg} />
        </div>
      </div>
    </div>
  </div>
);
