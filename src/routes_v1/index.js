import express from "express";
import userRoutes from "./users/users_routes.js";

const v1 = express.Router();
v1.use("/user", userRoutes);
v1.get(
  "/health",
  tryCatchUtil(async (req, res) => {
    return res.send({ health: "OK" });
  })
);

export default v1;