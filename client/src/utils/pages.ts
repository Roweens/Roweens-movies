export const getPagesCount = (totalCount: number, limit = 10) => {
  return Math.ceil(totalCount / limit);
};

export const getPagesArray = (totalCount: number): number[] => {
  const totalPages = getPagesCount(totalCount);
  let arr: number[] = [];
  for (let i = 0; i < totalPages; i++) {
    arr.push(i + 1);
  }

  return arr;
};
