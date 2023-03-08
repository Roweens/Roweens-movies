import { useMemo } from 'react';
import { FiltersType } from '../types/filters';
import { Movie } from '../types/movie';
import { calcAverageFromArr } from '../utils/calvAvg';

export const useSortedMovies = (movies: Movie[], sortType: string) => {
  const sortedMovies = useMemo(() => {
    if (sortType === 'rating') {
      return movies.sort((first, second) => {
        if (first.ratings.length && second.ratings.length) {
          return (
            calcAverageFromArr(second, 'ratings', 'rating') -
            calcAverageFromArr(first, 'ratings', 'rating')
          );
        } else return 0;
      });
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

export const useSortedAndFilteredMovies = (
  movies: Movie[],
  sortType: string,
  filters: FiltersType
) => {
  const sortedMovies = useSortedMovies(movies, sortType);

  const sortedAndFilteredMovies = useMemo(() => {
    return sortedMovies.filter(function (movie) {
      for (let filter in filters) {
        if (filter === 'genres') {
          if (
            movie[filter] === undefined ||
            !movie[filter].includes(filters[filter]!)
          ) {
            return false;
          }
        } else if (
          movie[filter as keyof Movie] === undefined ||
          movie[filter as keyof Movie] !== filters[filter as keyof FiltersType]
        )
          return false;
      }
      return true;
    });
  }, [filters, sortedMovies, sortType]);
  return sortedAndFilteredMovies;
};
