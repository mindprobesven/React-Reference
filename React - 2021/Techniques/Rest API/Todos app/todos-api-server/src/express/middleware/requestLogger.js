/* eslint-disable max-len */
const logger = require('../../utils/logger');

const requestLogger = (req, res, next) => {
  logger.express.log({
    level: 'info',
    message: `[ ${req.method} ] - ${req.url} - ${req.ip} - ${req.get('user-agent')}`,
  });
  next();
};

module.exports = requestLogger;
