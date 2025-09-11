import { logger } from "../../configs/loggerConfig.js";
import CustomError from "../../errors/customError.js";
import { getUserById } from "../../services/userService.js";
import tryCatchUtil from "../../utilities/tryCatchUtil.js";

export const getUser = tryCatchUtil(async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);
  if (!user) {
    throw new CustomError("User not found", 400);
  }
return res.send({ data: {user} });
});

export const getUsers = tryCatchUtil(async (req, res) => {
  const body = req.body;
  const user = await getUsers(id);
  if (!user) {
    throw new CustomError("User not found", 400);
  }
  return res.send({ data: { user } });
});

export const createUser = tryCatchUtil(async (req, res) => {});
export const updateUser = tryCatchUtil(async (req, res) => { });
export const deleteUser = tryCatchUtil(async (req, res) => {});