import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../features/auth-slice';
import { rateMovie } from '../../features/movie-slice';
import styles from './StarRating.module.scss';

export const StarRating = ({ active, id }) => {
  const [isRated, setIsRated] = useState(active);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleRating = (ratingValue) => {
    if (!user) navigate('/login');
    setIsRated(false);
    setRating(ratingValue);
    dispatch(rateMovie({ id, ratingValue }));
  };

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
                  onClick={() => handleRating(ratingValue)}
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
