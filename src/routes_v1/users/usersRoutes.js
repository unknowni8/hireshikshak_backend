import express from 'express'
import { createUser, deleteUser, getUser, getUsers, updateUser } from './usersControllers.js';

const userRoutes = express.Router();

userRoutes.get("/:id", getUser);
userRoutes.post("/", getUsers);
userRoutes.put("/", createUser);
userRoutes.patch("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;