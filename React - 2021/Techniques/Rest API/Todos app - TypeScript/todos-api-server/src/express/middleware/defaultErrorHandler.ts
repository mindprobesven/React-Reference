import express from 'express';

import responseError from '../responseHandlers/error';

const defaultErrorHandler = (
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  console.log('defaultErrorHandler');
  console.log(error.name);

  responseError({
    req,
    res,
    status: 500,
    error,
  });

  next();
};

export default defaultErrorHandler;
