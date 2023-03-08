export const calcAverageFromArr = (
  obj: Object,
  cat: string,
  value: string
): number => {
  let avg = 0;
  if (obj) {
    const array = obj[cat as keyof typeof obj];

    if (Array.isArray(array)) {
      array.forEach((el): void => {
        if (typeof el[value as keyof typeof el] === 'number') {
          avg = avg + el[value as keyof typeof el];
        }
      });
    }
  }
  return parseInt((avg / obj[cat as keyof typeof obj].length).toFixed(1));
};
