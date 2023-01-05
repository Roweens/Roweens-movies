import { useState } from 'react';
import styles from './StarRating.module.scss';

export const StarRating = ({ active }) => {
  const [isRated, setIsRated] = useState(active);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div className={styles.starRating}>
      {!isRated ? (
        rating ? (
          <span>{rating}</span>
        ) : (
          <i
            className={styles.starRatingDefaultStar + ' fa-regular fa-star'}
            onClick={() => setIsRated(!isRated)}
          />
        )
      ) : (
        <>
          {' '}
          {[...Array(10)].map((star, i) => {
            const ratingValue = i + 1;

            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  className={styles.starRatingRadio}
                  value={ratingValue}
                  onClick={() => {
                    setIsRated(false);
                    setRating(ratingValue);
                  }}
                />
                <i
                  className={
                    styles.starRatingStar +
                    ` ${
                      ratingValue <= (hover || rating)
                        ? 'fa-solid'
                        : 'fa-regular'
                    } fa-star`
                  }
                  style={{
                    color:
                      ratingValue <= (hover || rating) ? '#ffc107' : 'white',
                  }}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </>
      )}
    </div>
  );
};
