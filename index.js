import { envConfig } from "./src/utilities/envKeysUtil.js"; // this should be on top.
import { createServer } from "./src/app.js";
import { logger } from "./src/configs/loggerConfig.js";
import mongoDBConnection from "./src/configs/dbConfig.js";

try {
  const server = createServer();
  await mongoDBConnection.connect();
  server.listen(envConfig.port, () => {
    logger.info(
      `🚀 Server is running on ${envConfig.port} in ${envConfig.env} environment`
    );
  });
} catch (error) {
  logger.info(error);
}
