import express from "express";
import userRoutes from "./users/users_routes.js";

const v1 = express.Router();
v1.use("/user", userRoutes);

export default v1;