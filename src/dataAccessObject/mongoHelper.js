function convertToArray(obj) {
  if (Array.isArray(obj)) {
    return obj;
  }
  return [obj];
}

export function createMongoQueryFilter(filterJsonQuery, filterColumnArray) {
  const mongoQuery = {};
  filterColumnArray?.forEach((column) => {
    if (filterJsonQuery[column]) {
      mongoQuery[column] = { $in: convertToArray(filterJsonQuery[column]) };
    }
  });
  return mongoQuery;
}
