/* eslint-disable max-len */
const { validationResult } = require('express-validator');
const logger = require('../../utils/logger');

const validatePostRequest = (validationSchema) => async (req, res, next) => {
  // First checks if the request header contains the fields 'Content-Type' and 'Accept' with an acceptable content type (application/json)
  if (req.get('Content-Type') === 'application/json'
  && req.is('application/json') === 'application/json'
  && req.accepts('application/json') === 'application/json') {
    // Then run the validation process on 'req' using the provided validation schema
    await validationSchema.run(req);

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    logger.express.log({
      level: 'error',
      message: `[ ${req.method} ] 400 - Validation failed for incoming data - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
    });

    return res.status(400).json({
      status: 400,
      error: errors.array(),
    });
  }
  logger.express.log({
    level: 'error',
    message: `[ ${req.method} ] 406 - Not acceptable - ${req.get('Accept')} <- -> ${req.get('Content-Type')} - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
  });

  return res.status(406).json({
    status: 406,
    error: 'Not acceptable',
  });
};

module.exports = validatePostRequest;
