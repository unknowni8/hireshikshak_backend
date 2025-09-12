import express from "express";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./users/usersRoutes.js";
import tryCatchUtil from "../utilities/tryCatchUtil.js";
import { swaggerSpec } from "../configs/swaggerConfig.js";

const v1 = express.Router();

v1.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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

v1.use("/users", userRoutes);

export default v1;