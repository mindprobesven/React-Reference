import express from 'express';

import responseError from '../responseHandlers/error';

const validateGetRequest = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  if (req.accepts('application/json') === 'application/json') {
    return next();
  }
  return responseError(req, res, 406, '406 - Not acceptable', null);
};

export default validateGetRequest;
