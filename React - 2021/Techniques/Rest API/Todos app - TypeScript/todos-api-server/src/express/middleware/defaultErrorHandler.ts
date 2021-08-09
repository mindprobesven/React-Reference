import express from 'express';

import responseError from '../responseHandlers/error';

const defaultErrorHandler = (
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  console.log('defaultErrorHandler');
  console.log(error.message);

  // Message only
  responseError(
    req,
    res,
    'Error message only',
    null,
  );

  // Error only
  responseError(
    req,
    res,
    null,
    error,
    500,
  );

  // Message and Error object
  responseError(
    req,
    res,
    'Mesage and error object',
    [{ error: 'bla' }],
  );

  /* responseError({
    req,
    res,
    status: 500,
    error,
  }); */

  next();
};

export default defaultErrorHandler;
