import express from 'express'
import { getUser } from './users_controllers.js';

const userRoutes = express.Router();

userRoutes.get("/:id", getUser);

export default userRoutes;