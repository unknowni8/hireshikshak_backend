import BaseFilter from "./baseFilter.js";

export default class UserFilter extends BaseFilter {
  constructor({userIdArray}) {
    super();
    this.userIdArray = userIdArray;
  }
}