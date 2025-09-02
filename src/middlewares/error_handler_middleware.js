import { logger } from "../configs/logger_config.js";
import CustomError from "../errors/custom_error.js";
import ErrorMsgUtil from "../utilities/error_msg_util.js";

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
        message: ErrorMsgUtil.SERVER_ERROR
    });
};