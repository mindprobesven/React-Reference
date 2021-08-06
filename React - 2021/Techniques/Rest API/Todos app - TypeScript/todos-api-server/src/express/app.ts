/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';

import { ENV_TYPE, EXPRESS_PORT } from '../config/config';

import requestLogger from './middleware/requestLogger';
import defaultErrorHandler from './middleware/defaultErrorHandler';

import responseError from './responseHandlers/error';

import logger from '../utils/logger';

console.log('Loaded router module');
export default class ExpressServer {
  private static server: ExpressServer;

  private express;

  private constructor() {
    this.express = express();
  }

  private configure() {
    // Middleware to handle favicon.ico requests
    this.express.use(favicon(path.join(__dirname, '../../public', 'favicon.ico')));

    // Middleware for requests logging
    this.express.use(requestLogger);

    // curl -X GET -H "Accept: application/json" http://127.0.0.1:5000
    this.express.get('/', (req, res) => {
      console.log('Request');
      throw new Error('Foo');
      res.sendStatus(200);
    });

    this.express.get('*', (req: express.Request, res: express.Response) => responseError({
      req,
      res,
      status: 404,
      message: '404 - Bad Request',
    }));

    this.express.use(defaultErrorHandler);
  }

  private listen(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      try {
        this.express.listen(EXPRESS_PORT, () => {
          logger.express.log({
            level: 'info',
            message: `${ENV_TYPE} server is listening on port ${EXPRESS_PORT}!`,
          });
          resolve(true);
        });
      } catch (error) {
        if (error instanceof Error) {
          logger.express.log({
            level: 'error',
            message: `${error.name} - ${error.message}`,
          });
          reject(error);
        }
      }
    });
  }

  static async start(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (typeof this.server === 'undefined') {
        this.server = new ExpressServer();
        this.server.configure();

        this.server.listen().then(() => resolve(true)).catch((error: Error) => resolve(false));
      }
    });
  }
}
