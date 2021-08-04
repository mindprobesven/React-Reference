/* eslint-disable max-len */
const mongoConnection = require('../../mongo/connection');
const responseError = require('../responseHandlers/error');

const checkMongoConnection = (req, res, next) => {
  if (mongoConnection.isConnected) {
    return next();
  }
  return responseError({
    req,
    res,
    status: 500,
    message: '500 - No database connection',
  });
};

module.exports = checkMongoConnection;
