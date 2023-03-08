import styles from './RemoveFilter.module.scss';

type Filters = {
  year?: string;
  country?: string;
  genres?: string;
};

interface RemoveFilterProps {
  filters: Filters;
  value: keyof Filters;
  onClick: (value: string) => void;
}

export const RemoveFilter = ({
  filters,
  value,
  onClick,
}: RemoveFilterProps) => {
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
