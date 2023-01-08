import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getAllMovies } from '../../features/movie-slice';
import { Loading } from '../Loading';
import { SearchMovie } from '../SearchMovie/SearchMovie';
import styles from './SearchMovies.module.scss';

export const SearchMovies = () => {
  const [sortType, setSortType] = useState('rating');

  const [yearValues, setYearValues] = useState('');
  const [genreValues, setGenreValues] = useState('');
  const [countryValues, setCountryValues] = useState('');

  const [movies, setMovies] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState(null);
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();
  const { search } = useLocation();

  useEffect(() => {
    dispatch(getAllMovies(search))
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
        setFilteredMovies(sortedMovies);

        const yearArr = [];
        const genresArr = [];
        const countriesArr = [];

        res.data.forEach((movie) => {
          if (!yearArr.includes(movie.year)) yearArr.push(movie.year);
          if (!countriesArr.includes(movie.country))
            countriesArr.push(movie.country);
          movie.genres.forEach((genre) => {
            if (!genresArr.includes(genre)) genresArr.push(genre);
          });
        });

        setYearValues(yearArr);
        setCountryValues(countriesArr);
        setGenreValues(genresArr);
      });
  }, [dispatch, search]);

  useEffect(() => {
    if (filteredMovies) {
      const newArr = movies.filter(function (movie) {
        for (let filter in filters) {
          if (filter === 'genres') {
            if (
              movie[filter] === undefined ||
              !movie[filter].includes(filters[filter])
            ) {
              return false;
            }
          } else if (
            movie[filter] === undefined ||
            movie[filter] !== filters[filter]
          )
            return false;
        }
        return true;
      });

      setFilteredMovies(newArr);
    }
  }, [filters]);

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

  const handleFilter = () => {
    // if (!yearValue && filter === 'year') {
    //   setFilteredMovies(
    //     filteredMovies.filter((movie) => movie.year === e.target.value)
    //   );
    // } else if (yearValue && filter === 'year') {
    //   setFilteredMovies(
    //     movies.filter((movie) => movie.year === e.target.value)
    //   );
    // } else if (!genreValue && filter === 'genre') {
    //   console.log(e.target.value);
    //   setFilteredMovies(
    //     filteredMovies.filter((movie) => movie.genres.includes(e.target.value))
    //   );
    // } else if (genreValue && filter === 'genre') {
    //   console.log(e.target.value);
    //   setFilteredMovies(
    //     movies.filter((movie) => movie.genres.includes(e.target.value))
    //   );
    // }
  };

  // const handleYearFilter = (e) => {
  //   setYearValue(e.target.value);

  //   const filteredByYear = filters.map((filter) =>
  //     movies.filter((movie) => movie[filter.filter] === filter.value)
  //   );
  //   console.log(filteredByYear);

  //   setFilters([...filters, { filter: 'year', value: e.target.value }]);
  //   setFilteredMovies(filteredByYear);
  // };

  return (
    <>
      {' '}
      {filteredMovies ? (
        <div className={styles.searchMovies}>
          <div className={styles.searchMoviesFiltersWrapper}>
            <h2 className={styles.searchMoviesFiltersTitle}>Filters</h2>
            <div className={styles.searchMoviesFilters}>
              <p className={styles.searchMoviesFilterTitle}>Year</p>
              <select
                name="year"
                id="year"
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    year: e.target.value,
                  });
                }}
              >
                <option value="" disabled selected hidden>
                  Any
                </option>
                {yearValues.map((year, i) => {
                  return (
                    <option value={year} key={i}>
                      {year}
                    </option>
                  );
                })}
              </select>
              <p className={styles.searchMoviesFilterTitle}>Country</p>
              <select
                name="country"
                id="country"
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    country: e.target.value,
                  });
                }}
              >
                <option value="" disabled selected hidden>
                  Any
                </option>
                {countryValues.map((country, i) => {
                  return (
                    <option value={country} key={i}>
                      {country}
                    </option>
                  );
                })}
              </select>
              <p className={styles.searchMoviesFilterTitle}>Genre</p>
              <select
                name="genre"
                id="genre"
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    genres: e.target.value,
                  });
                }}
              >
                <option value="" disabled selected hidden>
                  Any
                </option>
                {genreValues.map((genre, i) => {
                  return (
                    <option value={genre} key={i}>
                      {genre}
                    </option>
                  );
                })}
              </select>
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
                <Link to={`/search/?type=movie`}>
                  <div className={styles.searchMoviesCat}>
                    <h5 className={styles.searchMoviesCatTitle}>Movies</h5>
                    {/* <p className={styles.searchMoviesCatTotal}>
                  {movies &&
                    movies.filter((movie) => movie.type === 'movie').length}
                </p> */}
                  </div>
                </Link>
                <Link to={`/search/?type=anime`}>
                  <div className={styles.searchMoviesCat}>
                    <h5 className={styles.searchMoviesCatTitle}>Anime</h5>
                    {/* <p className={styles.searchMoviesCatTotal}>
                  {movies &&
                    movies.filter((movie) => movie.type === 'anime').length}
                </p> */}
                  </div>
                </Link>
                <Link to={`/search/?type=series`}>
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

            <div className={styles.searchMoviesList}>
              {filteredMovies.map((movie) => {
                return <SearchMovie movie={movie} key={movie._id} />;
              })}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
