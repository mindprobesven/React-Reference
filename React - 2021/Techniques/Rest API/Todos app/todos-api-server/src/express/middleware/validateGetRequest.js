/* eslint-disable max-len */
const logger = require('../../utils/logger');

const validateGetRequest = async (req, res, next) => {
  if (req.accepts('application/json') === 'application/json') {
    return next();
  }
  logger.express.log({
    level: 'error',
    message: `[ ${req.method} ] 406 - Not acceptable - ${req.get('Accept')} - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
  });

  return res.status(406).json({
    status: 406,
    error: 'Not acceptable',
  });
};

module.exports = validateGetRequest;
