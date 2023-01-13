import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getAllMovies } from '../../features/movie-slice';
import { useSortedAndFilteredMovies } from '../../hooks/useMovies';
import { getPagesCount } from '../../utils/pages';
import { values } from '../../utils/values';
import { Loading } from '../Loading';
import { SearchMovie } from '../SearchMovie/SearchMovie';
import { CustomSelect } from '../UI/CustomSelect';
import { RemoveFilter } from '../UI/RemoveFilter';
import styles from './SearchMovies.module.scss';

export const SearchMovies = () => {
  const [sortType, setSortType] = useState('date');
  const [filters, setFilters] = useState({});
  const [yearValues, setYearValues] = useState(null);
  const [countryValues, setCountryValues] = useState(null);
  const [genreValues, setGenreValues] = useState(null);
  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const sortedAndFilteredMovies = useSortedAndFilteredMovies(
    movies,
    sortType,
    filters
  );
  const dispatch = useDispatch();
  const { search } = useLocation();
  const lastElement = useRef();
  const observer = useRef();

  const sortOptions = [
    { value: 'rating', name: 'By rating' },
    { value: 'date', name: 'By date' },
    { value: 'popularity', name: 'By popularity' },
    { value: 'name', name: 'By name' },
  ];

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    var callback = function (entries, observer) {
      if (entries[0].isIntersecting && page < totalPages) {
        console.log('pisi');
        setPage(page + 1);
      }
    };

    observer.current = new IntersectionObserver(callback);
    observer.current.observe(lastElement.current);
  }, [movies]);

  useEffect(() => {
    dispatch(getAllMovies({ search, page }))
      .unwrap()
      .then((res) => {
        setMovies([...movies, ...res.data]);
        setTotalPages(getPagesCount(res.headers['total-count']));
      });
  }, [dispatch, search, page]);

  useMemo(() => {
    setYearValues(values(movies, 'year'));
    setCountryValues(values(movies, 'country'));
    setGenreValues(values(movies, 'genres'));
  }, [movies]);

  const handleRemoveFilter = (value) => {
    if (value === 'year') {
      const { year, ...others } = filters;
      setFilters(others);
    } else if (value === 'genres') {
      const { genres, ...others } = filters;
      setFilters(others);
    } else {
      const { country, ...others } = filters;
      setFilters(others);
    }
  };

  const handleAddFilter = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSetSort = (e) => {
    setSortType(e.target.value);
  };

  return (
    <>
      {' '}
      {movies ? (
        <div className={styles.searchMovies}>
          <div className={styles.searchMoviesFiltersWrapper}>
            <h2 className={styles.searchMoviesFiltersTitle}>Filters</h2>
            <div className={styles.searchMoviesFiltersRemove}>
              <RemoveFilter
                filters={filters}
                value={'year'}
                onClick={handleRemoveFilter}
              />

              <RemoveFilter
                filters={filters}
                value={'country'}
                onClick={handleRemoveFilter}
              />

              <RemoveFilter
                filters={filters}
                value={'genres'}
                onClick={handleRemoveFilter}
              />
            </div>
            <div className={styles.searchMoviesFilters}>
              <p className={styles.searchMoviesFilterTitle}>Year</p>
              {yearValues && (
                <CustomSelect
                  options={yearValues}
                  defaultValue="Any"
                  value={filters.year ? filters.year : 'Any'}
                  onChange={handleAddFilter}
                  name="year"
                />
              )}
              <p className={styles.searchMoviesFilterTitle}>Country</p>
              {countryValues && (
                <CustomSelect
                  options={countryValues}
                  defaultValue="Any"
                  value={filters.country ? filters.country : 'Any'}
                  onChange={handleAddFilter}
                  name="country"
                />
              )}
              <p className={styles.searchMoviesFilterTitle}>Genre</p>
              {genreValues && (
                <CustomSelect
                  options={genreValues}
                  defaultValue="Any"
                  value={filters.genres ? filters.genres : 'Any'}
                  onChange={handleAddFilter}
                  name="genres"
                />
              )}
            </div>
          </div>
          <div className={styles.searchMoviesListWrapper}>
            <h2 className={styles.searchMoviesListTitle}>All Movies</h2>
            <div className={styles.searchMoviesCatsWrapper}>
              <div className={styles.searchMoviesCats}>
                <Link to={'/search'}>
                  <div className={styles.searchMoviesCat}>
                    <h5 className={styles.searchMoviesCatTitle}>All</h5>
                  </div>
                </Link>
                <Link to={`/search/?type=movie`}>
                  <div className={styles.searchMoviesCat}>
                    <h5 className={styles.searchMoviesCatTitle}>Movies</h5>
                  </div>
                </Link>
                <Link to={`/search/?type=anime`}>
                  <div className={styles.searchMoviesCat}>
                    <h5 className={styles.searchMoviesCatTitle}>Anime</h5>
                  </div>
                </Link>
                <Link to={`/search/?type=series`}>
                  <div className={styles.searchMoviesCat}>
                    <h5 className={styles.searchMoviesCatTitle}>Series</h5>
                  </div>
                </Link>
              </div>
              <div className={styles.searchMoviesCatsSort}>
                <CustomSelect
                  options={sortOptions}
                  defaultValue="date"
                  value={sortType}
                  onChange={handleSetSort}
                />
              </div>
            </div>

            <div className={styles.searchMoviesList}>
              {sortedAndFilteredMovies.map((movie, i, array) => {
                return <SearchMovie movie={movie} key={movie._id} />;
              })}
            </div>

            <div ref={lastElement} className={styles.dynamic}></div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
