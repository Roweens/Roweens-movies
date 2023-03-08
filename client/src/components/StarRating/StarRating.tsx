import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { selectUser } from '../../features/auth-slice';
import { rateMovie } from '../../features/movie-slice';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Rating } from '../../types/movie';
import styles from './StarRating.module.scss';

interface StarRatingProps {
  active: boolean;
  id: string;
  ratings?: Rating[] | [];
}

export const StarRating = ({ active, id, ratings = [] }: StarRatingProps) => {
  const [isRated, setIsRated] = useState(active);
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(0);

  const dispatch = useTypedDispatch();
  const user = useTypedSelector(selectUser);
  const navigate = useNavigate();

  const handleRating = (ratingValue: number) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsRated(false);
    setRating(ratingValue);
    dispatch(rateMovie({ id, ratingValue, userId: user._id }))
      .then(() => {
        toast.success('Rated successfully');
      })
      .catch(() => {
        toast.error('Something went wrong');
      });
  };

  return (
    <div className={styles.starRating}>
      {!isRated ? (
        <i
          className={styles.starRatingDefaultStar + ' fa-regular fa-star'}
          onClick={() => setIsRated(!isRated)}
        />
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
