import "dotenv/config";

export const envConfig = {
  env: process.env.NODE_ENV,
  logLevel: process.env.LOG_LEVEL,
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
};