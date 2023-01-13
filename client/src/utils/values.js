export const values = (array, value) => {
  let values = [];

  array.forEach((item) => {
    if (typeof item[value] === 'string') {
      if (!values.find((option) => option.value === item[value])) {
        values.push({ value: item[value], name: item[value] });
      }
      values.sort((prev, next) => next.value - prev.value);
    }
    if (item[value] instanceof Array) {
      item[value].forEach((element) => {
        if (!values.find((option) => option.value === element)) {
          values.push({ value: element, name: element });
        }
      });
    }
  });

  return values;
};
