/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */

import express from 'express';
import logger from '../../utils/logger';

type ResponseError = {
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
const responseError = ({
  req,
  res,
  status = 400,
  message,
  payload,
  error,
}: ResponseError): express.Response => {
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
