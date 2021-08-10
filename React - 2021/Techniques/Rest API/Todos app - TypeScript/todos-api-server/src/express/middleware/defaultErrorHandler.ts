import express from 'express';

import responseError from '../responseHandlers/error';

const defaultErrorHandler = (
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  responseError(req, res, 500, null, error);
  next();
};

export default defaultErrorHandler;
