/* eslint-disable max-len */
const mongoConnection = require('../../mongo/connection');
const logger = require('../../utils/logger');

const checkMongoConnection = (req, res, next) => {
  if (mongoConnection.isConnected) {
    return next();
  }

  logger.express.log({
    level: 'error',
    message: `[ ${req.method} ] 500 - No database connection - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
  });

  return res.status(500).json({
    status: 500,
    error: 'No database connection',
  });
};

module.exports = checkMongoConnection;
