import User from "../models/user.js";
import { createMongoQueryFilter } from "./mongoHelper.js";

const FILTER_QUERY_FIELD = ["_id", "full_name"];

export async function findUsers(userFilter, projectionFields) {
  const mongoQuery = User.find(getQueryFilter(userFilter), projectionFields).lean();
  return await mongoQuery.exec();
}

/**
 *
 * @param {*} userFilter
 * UserFilter("bj1434njk34", "Nishant Kumar");
 * UserFilter(["bj1434njk34", "q14jn2jn4jn"], "Nishant Kumar");
 * it should be UserFilter[]
 */
function getQueryFilter(userFilter) {
  const queryFilterArray = [];
  if (!Array.isArray(userFilter)) {
    userFilter = [userFilter];
  }
  userFilter.forEach((filter) => {
    queryFilterArray.push(createQuery(filter));
  });
  let queryFilter;
  queryFilter = { $or: queryFilterArray };
  return queryFilter;
}

function createQuery(filter) {
  const filterJsonQuery = {};
  if (filter.userIdArray) {
    filterJsonQuery["_id"] = filter.userIdArray;
  }
  if (filter.fullName) {
    filterJsonQuery["full_name"] = filter.fullName;
  }
  const mongoQuery = createMongoQueryFilter(
    filterJsonQuery,
    FILTER_QUERY_FIELD
  );
  return mongoQuery;
}
