/* eslint-disable max-len */
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');

const { ENV_TYPE, EXPRESS_PORT } = require('../config/config');
const requestLogger = require('./middleware/requestLogger');
const adminRouter = require('./routes/admin');

const logger = require('../utils/logger');

const app = express();

const defaultErrorHandler = (error, req, res, next) => {
  logger.express.log({
    level: 'error',
    message: error,
  });

  res.status(500).send('500 - Internal Server Error');
  next();
};

// Middleware to handle favicon.ico requests
app.use(favicon(path.join(__dirname, '../../public', 'favicon.ico')));

// Middleware for requests logging
app.use(requestLogger);

app.use('/admin', adminRouter);

app.get('*', (req, res) => {
  logger.express.log({
    level: 'error',
    message: `404 - [ ${req.method} ] - ${req.url} - ${req.ip} - ${req.get('user-agent')}`,
  });

  res.status(404).send('404 - Bad Request');
});

app.use(defaultErrorHandler);

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
        message: error,
      });
    }
  })
);

module.exports = startExpressServer;
