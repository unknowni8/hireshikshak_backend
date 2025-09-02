import { envConfig } from './src/utilities/env_keys_util.js'; // this should be on top.
import { createServer } from './src/app.js';
import { logger } from './src/configs/logger_config.js';

try {
    const server = createServer();
    server.listen(envConfig.port, () => {
        logger.info(
          `🚀 Server is running on ${envConfig.port} in ${envConfig.env} environment`
        );
    });
} catch (error) {
    logger.info(error);
}