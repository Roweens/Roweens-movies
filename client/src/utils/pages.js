export const getPagesCount = (totalCount, limit = 10) => {
  return Math.ceil(totalCount / limit);
};

export const getPagesArray = (totalCount) => {
  const totalPages = getPagesCount(totalCount);
  let arr = [];
  for (let i = 0; i < totalPages; i++) {
    arr.push(i + 1);
  }

  return arr;
};
