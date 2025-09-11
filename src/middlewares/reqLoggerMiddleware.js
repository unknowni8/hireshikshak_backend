import { logger } from "../configs/loggerConfig.js";

const requestLogger = (req, res, next) => {
  logger.http({
    method: req.method,
    url: req.url,
    body: req.body,
  });
  next();
};
export default requestLogger;
