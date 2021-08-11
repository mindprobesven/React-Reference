/* eslint-disable max-len */
import express from 'express';

import { validationResult, ValidationChain } from 'express-validator';

import responseError from '../responseHandlers/error';

type ValidationSchema = ValidationChain[] & {
  run: (req: express.Request) => Promise<unknown[]>;
};

const validatePostRequest = (validationSchema: ValidationSchema) => async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
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
    return responseError(req, res, 400, 'Validation failed for incoming data', errors.array());
  }
  return responseError(req, res, 406, '406 - Not acceptable', null);
};

export default validatePostRequest;
