/* eslint-disable max-len */
const { validationResult } = require('express-validator');
const responseError = require('../responseHandlers/error');

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
    return responseError({
      req,
      res,
      message: 'Validation failed for incoming data',
      payload: errors.array(),
    });
  }
  return responseError({
    req,
    res,
    status: 406,
    message: '406 - Not acceptable',
  });
};

module.exports = validatePostRequest;
