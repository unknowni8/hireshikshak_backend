import express from 'express';
import helmet from 'helmet';
import compression from 'compression'
import cors from 'cors'
import v1 from './routes_v1/index.js';
import requestLogger from './middlewares/reqLoggerMiddleware.js';
import { errorHandler } from './middlewares/errorHandlerMiddleware.js';
import notFound from './middlewares/pageNotFoundMiddleware.js';

export const createServer = () => {
    const app = express();
    app.disable("x-powered-by")
        .use(express.urlencoded({ extended: true }))
        .use(express.json())
        .use(helmet({ xPoweredBy: false }))
        .use(cors())
        .use(compression())
        .use(requestLogger);
    
    app.use("/v1", v1);
    app.use(notFound);
    app.use(errorHandler);
    return app;
}