import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllMovies } from '../../features/movie-slice';
import { Loading } from '../Loading';
import { SearchMovie } from '../SearchMovie/SearchMovie';
import styles from './SearchMovies.module.scss';

export const SearchMovies = () => {
  const [isSorted, setIsSorted] = useState(false);
  const [sortType, setSortType] = useState('rating');
  const [dropYear, setDropYear] = useState(false);
  const [yearValue, setYearValue] = useState('Any year');
  const [movies, setMovies] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovies()).then((res) => setMovies(res.payload.data));
  }, [dispatch]);

  const handleYearFilter = (value) => {
    setYearValue(value);
  };

  const yearOptions = [
    { text: 'Any year', value: 'Any year' },
    { text: '2020-2025', value: '2020-2025' },
    { text: '2015-2020', value: '2015-2020' },
    { text: '2010-2015', value: '2010-2015' },
    { text: '2005-2010', value: '2005-2010' },
    { text: '2000-2005', value: '2000-2005' },
    { text: '1990-2000', value: '1990-2000' },
    { text: '1950-1990', value: '1950-1990' },
  ];

  return (
    <div className={styles.searchMovies}>
      <div className={styles.searchMoviesFiltersWrapper}>
        <h2 className={styles.searchMoviesFiltersTitle}>Filters</h2>
        <div className={styles.searchMoviesFilters}>
          <p className={styles.searchMoviesFilterTitle}>Year</p>
          <div
            className={styles.searchMoviesFilter}
            onClick={() => setDropYear(!dropYear)}
          >
            <span className={styles.searchMoviesFilterValue}>{yearValue}</span>
            <i
              className={
                styles.searchMoviesFilterIcon + ' fa-solid fa-sort-down'
              }
            ></i>
            {dropYear && (
              <div className={styles.searchMoviesFilterDropdown}>
                {yearOptions.map((option, i) => {
                  return (
                    <div className={styles.searchMoviesFilterOption} key={i}>
                      <label htmlFor={option.value}>
                        <input
                          type="radio"
                          name={option.value}
                          id={option.value}
                          value={option.value}
                        />
                        <div
                          className={styles.searchMoviesFilterLabelWrapper}
                          onClick={() => handleYearFilter(option.value)}
                        >
                          <p className={styles.searchMoviesFilterLabel}>
                            {option.text}
                          </p>
                          {yearValue === option.value && (
                            <i
                              className={
                                styles.searchMoviesFilterIcon +
                                ' fa-solid fa-check'
                              }
                            />
                          )}
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <label></label>
        </div>
      </div>
      <div className={styles.searchMoviesListWrapper}>
        <h2 className={styles.searchMoviesListTitle}>All Movies</h2>
        <div className={styles.searchMoviesCatsWrapper}>
          <div className={styles.searchMoviesCats}>
            <div className={styles.searchMoviesCat}>
              <h5 className={styles.searchMoviesCatTitle}>Movies</h5>
              <p className={styles.searchMoviesCatTotal}>164</p>
            </div>
            <div className={styles.searchMoviesCat}>
              <h5 className={styles.searchMoviesCatTitle}>Anime</h5>
              <p className={styles.searchMoviesCatTotal}>164</p>
            </div>
            <div className={styles.searchMoviesCat}>
              <h5 className={styles.searchMoviesCatTitle}>Series</h5>
              <p className={styles.searchMoviesCatTotal}>164</p>
            </div>
          </div>
          <div
            className={styles.searchMoviesCatsSort}
            onClick={() => setIsSorted(!isSorted)}
          >
            <span className={styles.searchMoviesCatsSelect}>{sortType}</span>
            <i
              className={
                styles.searchMoviesCatsSelectIcon + ' fa-solid fa-caret-down'
              }
            />
            {isSorted && (
              <div className={styles.searchMoviesCatsDropdown}>
                <label>
                  <input type="radio" name="rating" value="rating" />
                  <div onClick={() => setSortType('rating')}>
                    <span className={styles.searchMoviesCatsDropdownOption}>
                      By rating
                    </span>
                    {sortType === 'rating' && (
                      <i className={styles.checked + ' fa-solid fa-check'}></i>
                    )}
                  </div>
                </label>

                <label>
                  <input type="radio" name="name" value="name" />
                  <div onClick={() => setSortType('name')}>
                    <span className={styles.searchMoviesCatsDropdownOption}>
                      By name
                    </span>
                    {sortType === 'name' && (
                      <i className={styles.checked + ' fa-solid fa-check'}></i>
                    )}
                  </div>
                </label>

                <label>
                  <input type="radio" name="date" value="date" />
                  <div onClick={() => setSortType('date')}>
                    <span className={styles.searchMoviesCatsDropdownOption}>
                      By date
                    </span>
                    {sortType === 'date' && (
                      <i className={styles.checked + ' fa-solid fa-check'}></i>
                    )}
                  </div>
                </label>

                <label>
                  <input type="radio" name="popularity" value="popularity" />
                  <div onClick={() => setSortType('popularity')}>
                    <span className={styles.searchMoviesCatsDropdownOption}>
                      By popularity
                    </span>
                    {sortType === 'popularity' && (
                      <i className={styles.checked + ' fa-solid fa-check'}></i>
                    )}
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>
        {!movies ? (
          <Loading />
        ) : (
          <div className={styles.searchMoviesList}>
            {movies.map((movie) => {
              return <SearchMovie movie={movie} key={movie._id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
