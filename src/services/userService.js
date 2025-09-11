import { findUsers } from "../dataAccessObject/userDao.js";
import UserFilter from "../filters/userFilter.js";

export const getUserById = async (id) => {
    const userFilter = new UserFilter({ userIdArray : id});
    const users = await findUsers(userFilter);
    if (users?.length === 0) {
        return null;
    }
    return users[0];
}

export const getUsers = async (body) => {
    const userFilter = new UserFilter({userIdArray: body.id});
}