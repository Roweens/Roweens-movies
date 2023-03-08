import { Movie } from '../types/movie';
import { SelectValues } from '../types/selectValues';

export const values = (
  array: Movie[],
  value: 'country' | 'year' | 'genres'
): SelectValues[] => {
  const values: SelectValues[] = [];

  array.forEach((item) => {
    if (typeof item[value] === 'string' && value !== 'genres') {
      if (!values.find((option) => option.value === item[value])) {
        values.push({ value: item[value], name: item[value] });
      }
      values.sort((prev, next) => parseInt(next.value) - parseInt(prev.value));
    }
    if (item[value] instanceof Array && value === 'genres') {
      item[value].forEach((element: string) => {
        if (!values.find((option) => option.value === element)) {
          values.push({ value: element, name: element });
        }
      });
    }
  });

  return values;
};
