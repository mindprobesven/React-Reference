/* eslint-disable max-len */
const logger = require('../../utils/logger');

const responseSuccess = ({
  req,
  res,
  status = 200,
  message,
  payload = undefined,
}) => {
  logger.express.log({
    level: 'info',
    message: `[ ${req.method} ] ${status} - ${message} - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
  });

  if (payload) {
    return res.status(status).json(payload);
  }

  return res.sendStatus(status);
};

module.exports = responseSuccess;
