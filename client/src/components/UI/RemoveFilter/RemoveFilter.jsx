import styles from './RemoveFilter.module.scss';

export const RemoveFilter = ({ filters, value, onClick }) => {
  return (
    <>
      {filters[value] && (
        <div className={styles.searchMoviesFiltersRemoveBtn}>
          <p>{filters[value]}</p>
          <i
            className={styles.searchMoviesIcon + ' fa-solid fa-xmark'}
            onClick={() => {
              onClick(value);
            }}
          ></i>
        </div>
      )}
    </>
  );
};
