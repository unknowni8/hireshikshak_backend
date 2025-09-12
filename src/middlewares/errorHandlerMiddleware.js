import { logger } from "../configs/loggerConfig.js";
import CustomError from "../errors/customError.js";
import ErrorMsgUtil from "../errors/errorMsg.js";

export const errorHandler = (err, req, res, next) => {
  logger.error(err);
  if (res.headerSent) {
    next(err);
    return;
  }
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
    return;
  }
  res.status(500).json({
    message: ErrorMsgUtil.SERVER_ERROR,
  });
};
