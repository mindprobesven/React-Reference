import express from 'express';

import Mongo from '../../mongo/connection';
import responseError from '../responseHandlers/error';

const checkMongoConnection = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  if (Mongo.isConnected) {
    return next();
  }
  return responseError(req, res, 500, '500 - No database connection', null);
};

export default checkMongoConnection;
