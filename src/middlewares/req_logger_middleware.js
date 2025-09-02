import { logger } from "../configs/logger_config.js";

const requestLogger = (req, res, next) => {
    logger.http({
        method: req.method,
        url: req.url,
        body: req.body,
    });
    next();
}
export default requestLogger;