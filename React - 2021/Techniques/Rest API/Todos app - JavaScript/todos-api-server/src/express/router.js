/* eslint-disable max-len */
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');

const { ENV_TYPE, EXPRESS_PORT } = require('../config/config');

const requestLogger = require('./middleware/requestLogger');
const adminRouter = require('./routes/admin');
const responseError = require('./responseHandlers/error');

const logger = require('../utils/logger');

const app = express();

const defaultErrorHandler = (error, req, res, next) => {
  responseError({
    req,
    res,
    status: 500,
    error,
  });
  return next();
};

// Middleware to handle favicon.ico requests
app.use(favicon(path.join(__dirname, '../../public', 'favicon.ico')));

// Middleware for requests logging
app.use(requestLogger);

app.use('/admin', adminRouter);

app.get('*', (req, res) => responseError({
  req,
  res,
  status: 404,
  message: '404 - Bad Request',
}));

app.use(defaultErrorHandler);

/** Starts the Express server and listens on the configured port. */
const startExpressServer = () => (
  new Promise((resolve) => {
    try {
      app.listen(EXPRESS_PORT, () => {
        logger.express.log({
          level: 'info',
          message: `${ENV_TYPE} server is listening on port ${EXPRESS_PORT}!`,
        });
        resolve(true);
      });
    } catch (error) {
      logger.express.log({
        level: 'error',
        message: `${error.name} - ${error.message}`,
      });
    }
  })
);

module.exports = startExpressServer;
