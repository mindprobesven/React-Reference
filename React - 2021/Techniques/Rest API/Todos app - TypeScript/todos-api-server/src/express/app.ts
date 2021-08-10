/* eslint-disable max-len */

import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';

import { ENV_TYPE, EXPRESS_PORT } from '../config/config';

import requestLogger from './middleware/requestLogger';
import defaultErrorHandler from './middleware/defaultErrorHandler';

import AdminController from './controllers/adminController';

import responseError from './responseHandlers/error';

import logger from '../utils/logger';

export default class ExpressServer {
  private static server: ExpressServer;

  private express;

  private constructor() {
    this.express = express();
  }

  private configure() {
    // Middleware to parse json from requests
    this.express.use(express.json());

    // Middleware to handle favicon.ico requests
    this.express.use(favicon(path.join(__dirname, '../../public', 'favicon.ico')));

    // Middleware for requests logging
    this.express.use(requestLogger);

    this.express.use('/admin', AdminController.create());

    // Handle 404s
    this.express.get('*', (req, res) => responseError(req, res, 404, '404 - Bad Request', null));

    // Middleware to handle errors
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
        this.server.listen().then(() => resolve(true)).catch(() => resolve(false));
      }
    });
  }
}
