const express = require('express');

const { ENV_TYPE, EXPRESS_PORT } = require('../config/config');
const adminRouter = require('./routes/admin');

const logger = require('../utils/logger');

const app = express();

app.use('/admin', adminRouter);

app.get('*', (req, res) => {
  res.status(404).send('Bad request');
});

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
