export const calcAverageFromArr = (obj, cat, value) => {
  let avg = 0;

  obj[cat].forEach((el) => {
    avg = avg + el[value];
  });

  return (avg / obj[cat].length).toFixed(1);
};
