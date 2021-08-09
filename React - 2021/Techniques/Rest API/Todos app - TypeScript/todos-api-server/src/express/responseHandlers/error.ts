/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */

import express from 'express';
import logger from '../../utils/logger';

interface ResponseError {
  (req: express.Request, res: express.Response, message: string, error: Array<Record<string, unknown>>, status?: number,): void;
  (req: express.Request, res: express.Response, message: null, error: Error, status?: number): void;
  (req: express.Request, res: express.Response, message: string, error: null, status?: number): void;
}

const responseError: ResponseError = (
  req: express.Request,
  res: express.Response,
  message: unknown,
  error: unknown,
  status = 400,
): void => {
  console.log(Array.isArray(error));
  console.log(error instanceof Error);
  console.log(error === null);
  console.log('--------');
  // console.log(message);
  // console.log(error);
  // console.log(status);
};

type ResponseError3 = {
  req: express.Request;
  res: express.Response;
  status: number;
  message?: string;
  payload?: Array<Record<string, unknown>>;
  error?: Error;
};

/**
 * Sends and logs a HTTP `error` response
 */
const responseError3 = ({
  req,
  res,
  status = 400,
  message,
  payload,
  error,
}: ResponseError3): express.Response => {
  if (message) {
    logger.express.log({
      level: 'error',
      message: `[ ${req.method} ] ${status} - ${message} - ${req.originalUrl} - ${req.ip} - ${String(req.get('user-agent'))}`,
    });

    return res.status(status).send(message);
  }

  return res.sendStatus(status);

  /* if (error) {
    logger.express.log({
      level: 'error',
      message: `[ ${req.method} ] ${status} - ${error.name} - ${error.message} - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
    });

    return res.status(status).send(`${error.name} - ${error.message}`);
  }

  if (message && payload) {
    logger.express.log({
      level: 'error',
      message: `[ ${req.method} ] ${status} - ${message} - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
    });

    return res.status(status).json({ error: payload });
  }

  if (message) {
    logger.express.log({
      level: 'error',
      message: `[ ${req.method} ] ${status} - ${message} - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
    });

    return res.status(status).send(message);
  }

  return res.sendStatus(status); */
};

export default responseError;
