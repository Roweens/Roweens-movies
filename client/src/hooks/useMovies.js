import { useMemo } from 'react';

export const useSortedMovies = (movies, sortType) => {
  const sortedMovies = useMemo(() => {
    if (sortType === 'rating') {
      return movies.sort(
        (first, second) =>
          second.ratings.reduce((prev, next) => prev + next, 0) /
            second.ratings.length -
          first.ratings.reduce((prev, next) => prev + next, 0) /
            first.ratings.length
      );
    } else if (sortType === 'popularity') {
      return movies.sort(
        (first, second) => second.ratings.length - first.ratings.length
      );
    } else if (sortType === 'name') {
      return movies.sort((first, second) =>
        first.title.localeCompare(second.title)
      );
    } else if (sortType === 'date') {
      return movies.sort(
        (first, second) => parseInt(second.year) - parseInt(first.year)
      );
    }

    return movies;
  }, [sortType, movies]);
  return sortedMovies;
};

export const useSortedAndFilteredMovies = (movies, sortType, filters) => {
  const sortedMovies = useSortedMovies(movies, sortType);

  const sortedAndFilteredMovies = useMemo(() => {
    return sortedMovies.filter(function (movie) {
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
  }, [filters, sortedMovies, sortType]);
  return sortedAndFilteredMovies;
};
