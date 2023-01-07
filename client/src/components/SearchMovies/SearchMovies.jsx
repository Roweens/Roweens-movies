import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
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
  const { search } = useLocation();

  useEffect(() => {
    const queries = search.split('/');
    dispatch(getAllMovies(queries))
      .unwrap()
      .then((res) => {
        const sortedMovies = res.data.sort(
          (first, second) =>
            second.ratings.reduce((prev, next) => prev + next, 0) /
              second.ratings.length -
            first.ratings.reduce((prev, next) => prev + next, 0) /
              first.ratings.length
        );

        setMovies(sortedMovies);
      });
  }, [dispatch, search]);

  const handleSort = (e) => {
    setSortType(e.target.value);
    if (e.target.value === 'rating') {
      const sortedRatingMovies = movies.sort(
        (first, second) =>
          second.ratings.reduce((prev, next) => prev + next, 0) /
            second.ratings.length -
          first.ratings.reduce((prev, next) => prev + next, 0) /
            first.ratings.length
      );
      setMovies(sortedRatingMovies);
    } else if (e.target.value === 'popularity') {
      const sortedPopularityMovies = movies.sort(
        (first, second) => second.ratings.length - first.ratings.length
      );
      setMovies(sortedPopularityMovies);
    } else if (e.target.value === 'name') {
      const sortedNameMovies = movies.sort((first, second) =>
        first.title.localeCompare(second.title)
      );
      setMovies(sortedNameMovies);
    } else if (e.target.value === 'date') {
      const sortedDateMovies = movies.sort(
        (first, second) => parseInt(second.year) - parseInt(first.year)
      );
      setMovies(sortedDateMovies);
    }
  };

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
            <Link to={'/search'}>
              <div className={styles.searchMoviesCat}>
                <h5 className={styles.searchMoviesCatTitle}>All</h5>
                {/* <p className={styles.searchMoviesCatTotal}>
                  {movies &&
                    movies.filter((movie) => movie.type === 'series').length}
                </p> */}
              </div>
            </Link>
            <Link to={'/search/?type=movie'}>
              <div className={styles.searchMoviesCat}>
                <h5 className={styles.searchMoviesCatTitle}>Movies</h5>
                {/* <p className={styles.searchMoviesCatTotal}>
                  {movies &&
                    movies.filter((movie) => movie.type === 'movie').length}
                </p> */}
              </div>
            </Link>
            <Link to={'/search/?type=anime'}>
              <div className={styles.searchMoviesCat}>
                <h5 className={styles.searchMoviesCatTitle}>Anime</h5>
                {/* <p className={styles.searchMoviesCatTotal}>
                  {movies &&
                    movies.filter((movie) => movie.type === 'anime').length}
                </p> */}
              </div>
            </Link>
            <Link to={'/search/?type=series'}>
              <div className={styles.searchMoviesCat}>
                <h5 className={styles.searchMoviesCatTitle}>Series</h5>
                {/* <p className={styles.searchMoviesCatTotal}>
                  {movies &&
                    movies.filter((movie) => movie.type === 'series').length}
                </p> */}
              </div>
            </Link>
          </div>
          <div className={styles.searchMoviesCatsSort}>
            <select
              name="sort"
              id="sort"
              value={sortType}
              onChange={handleSort}
            >
              <option value="rating">By rating</option>
              <option value="date">By date</option>
              <option value="popularity">By popularity</option>
              <option value="name">By name</option>
            </select>
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
