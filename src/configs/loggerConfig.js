import { createLogger, format, transports } from "winston";
const { combine, splat, timestamp, prettyPrint } = format;
import { envConfig } from "../utilities/envKeysUtil.js";

const logLevels = {
  error: 0,
  warning: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const logFormat = combine(
  format.errors({ stack: true }),
  splat(),
  timestamp(),
  prettyPrint(),
  format.colorize({
    all: true,
    colors: {
      error: "red",
      warning: "yellow",
      info: "green",
      http: "cyan",
      debug: "magenta",
    },
  })
);

export const logger = createLogger({
  level: envConfig.logLevel,
  levels: logLevels,
  format: logFormat,
  transports: [new transports.Console()],
});
