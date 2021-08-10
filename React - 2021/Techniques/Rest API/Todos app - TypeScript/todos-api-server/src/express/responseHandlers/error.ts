/* eslint-disable max-len */

import express from 'express';

import logger from '../../utils/logger';

interface ResponseError {
  (req: express.Request, res: express.Response, status: number, message: string, error: Array<Record<string, unknown>>): void;
  (req: express.Request, res: express.Response, status: number, message: null, error: Error): void;
  (req: express.Request, res: express.Response, status: number, message: string, error: null): void;
}

const responseError: ResponseError = (
  req: express.Request,
  res: express.Response,
  status: number,
  message: unknown,
  error: unknown,
): void => {
  if (error instanceof Error) {
    logger.express.log({
      level: 'error',
      message: `[ ${req.method} ] ${status} - ${error.name} - ${error.message} - ${req.originalUrl} - ${req.ip} - ${String(req.get('user-agent'))}`,
    });

    res.status(status).send(`${error.name} - ${error.message}`);
  }

  if (Array.isArray(error) && typeof message === 'string') {
    logger.express.log({
      level: 'error',
      message: `[ ${req.method} ] ${status} - ${message} - ${req.originalUrl} - ${req.ip} - ${String(req.get('user-agent'))}`,
    });

    res.status(status).json({ error });
  }

  if (error === null && typeof message === 'string') {
    logger.express.log({
      level: 'error',
      message: `[ ${req.method} ] ${status} - ${message} - ${req.originalUrl} - ${req.ip} - ${String(req.get('user-agent'))}`,
    });

    res.status(status).send(message);
  }
};

export default responseError;
