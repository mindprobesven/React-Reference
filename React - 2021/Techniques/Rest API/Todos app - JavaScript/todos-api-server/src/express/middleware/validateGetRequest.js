/* eslint-disable max-len */
const responseError = require('../responseHandlers/error');

const validateGetRequest = async (req, res, next) => {
  if (req.accepts('application/json') === 'application/json') {
    return next();
  }
  return responseError({
    req,
    res,
    status: 406,
    message: '406 - Not acceptable',
  });
};

module.exports = validateGetRequest;
