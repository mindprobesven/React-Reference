/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */

import express from 'express';
import { validationResult } from 'express-validator';

import responseError from '../responseHandlers/error';

interface IValidationSchema {
  run: (req: express.Request) => Promise<unknown[]>;
}

const validateQuery = (validationSchema: IValidationSchema) => async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  console.log('Middleware - validateQueryParams');

  await validationSchema.run(req);

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return responseError(req, res, 400, 'Invalid query', errors.array());
};

export default validateQuery;
