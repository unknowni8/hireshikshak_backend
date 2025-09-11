import express from "express";
import userRoutes from "./users/usersRoutes.js";
import tryCatchUtil from "../utilities/tryCatchUtil.js";

const v1 = express.Router();
v1.use("/users", userRoutes);
v1.get(
  "/health",
  tryCatchUtil(async (req, res) => {
    return res.json({
      status: "healthy",
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  })
);

export default v1;