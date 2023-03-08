import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAllMovies } from '../../features/movie-slice';
import { useSortedAndFilteredMovies } from '../../hooks/useMovies';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { FiltersType } from '../../types/filters';
import { Movie } from '../../types/movie';
import { SelectValues } from '../../types/selectValues';
import { getPagesArray, getPagesCount } from '../../utils/pages';
import { values } from '../../utils/values';
import { SearchMovie } from '../SearchMovie/SearchMovie';
import { CustomSelect } from '../UI/CustomSelect';
import { RemoveFilter } from '../UI/RemoveFilter';
import styles from './SearchMovies.module.scss';

export const SearchMovies = () => {
  const [sortType, setSortType] = useState('date');
  const [filters, setFilters] = useState<FiltersType>({});
  const [yearValues, setYearValues] = useState<SelectValues[] | null>(null);
  const [countryValues, setCountryValues] = useState<SelectValues[] | null>(
    null
  );
  const [genreValues, setGenreValues] = useState<SelectValues[] | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesPage, setMoviesPage] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const sortedAndFilteredMovies = useSortedAndFilteredMovies(
    movies,
    sortType,
    filters
  );
  const dispatch = useTypedDispatch();
  const { search } = useLocation();

  const sortOptions = [
    { value: 'rating', name: 'By rating' },
    { value: 'date', name: 'By date' },
    { value: 'popularity', name: 'By popularity' },
    { value: 'name', name: 'By name' },
  ];

  useEffect(() => {
    dispatch(getAllMovies(search))
      .unwrap()
      .then((res) => {
        setMovies(res as Movie[]);
        setYearValues(values(res, 'year'));
        setCountryValues(values(res, 'country'));
        setGenreValues(values(res, 'genres'));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, search]);

  useEffect(() => {
    setTotalPages(getPagesCount(sortedAndFilteredMovies.length));
    if (totalPages && page > totalPages) setPage(1);
    setMoviesPage(sortedAndFilteredMovies.slice(page * 10 - 10, page * 10));
  }, [page, sortedAndFilteredMovies, totalPages]);

  const pagesArr = getPagesArray(sortedAndFilteredMovies.length);

  const handleRemoveFilter = (value: string) => {
    if (filters) {
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
    }
  };

  const handleAddFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSetSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value);
  };

  return (
    <>
      {' '}
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
                value={filters && filters.year ? filters.year : 'Any'}
                onChange={handleAddFilter}
                name="year"
              />
            )}
            <p className={styles.searchMoviesFilterTitle}>Country</p>
            {countryValues && (
              <CustomSelect
                options={countryValues}
                defaultValue="Any"
                value={filters && filters.country ? filters.country : 'Any'}
                onChange={handleAddFilter}
                name="country"
              />
            )}
            <p className={styles.searchMoviesFilterTitle}>Genre</p>
            {genreValues && (
              <CustomSelect
                options={genreValues}
                defaultValue="Any"
                value={filters && filters.genres ? filters.genres : 'Any'}
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
            {movies.length ? (
              sortedAndFilteredMovies.map((movie: Movie, i: number) => {
                return <SearchMovie movie={movie} key={i} />;
              })
            ) : (
              <h2 className={styles.searchMoviesListNotFound}>Not found</h2>
            )}
          </div>
          <div className={styles.pageNumber}>
            {pagesArr.map((number) => {
              return (
                <span
                  key={number}
                  onClick={() => setPage(number)}
                  className={page === number ? styles.active : undefined}
                >
                  {number}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
