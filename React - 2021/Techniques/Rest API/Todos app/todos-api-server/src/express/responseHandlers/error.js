/* eslint-disable max-len */
const logger = require('../../utils/logger');

const responseError = ({
  req,
  res,
  status = 400,
  message = undefined,
  payload = undefined,
  error = undefined,
}) => {
  if (error) {
    logger.express.log({
      level: 'error',
      message: `[ ${req.method} ] ${status} - ${error.name} - ${error.message} - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
    });

    return res.status(status).send(`${error.name} - ${error.message}`);
  }

  if (message && payload) {
    logger.express.log({
      level: 'error',
      message: `[ ${req.method} ] ${status} - ${message} - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
    });

    return res.status(status).json({ error: payload });
  }

  if (message) {
    logger.express.log({
      level: 'error',
      message: `[ ${req.method} ] ${status} - ${message} - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
    });

    return res.status(status).send(message);
  }

  return res.sendStatus(status);
};

module.exports = responseError;
