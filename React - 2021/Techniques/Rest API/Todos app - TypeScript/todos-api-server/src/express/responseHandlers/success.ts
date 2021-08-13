/* eslint-disable max-len */

import express from 'express';

import logger from '../../utils/logger';

const responseSuccess = (
  req: express.Request,
  res: express.Response,
  status: number,
  message: string,
  payload?: unknown[],
): void => {
  logger.express.log({
    level: 'info',
    message: `[ ${req.method} ] ${status} - ${message} - ${req.originalUrl} - ${req.ip} - ${String(req.get('user-agent'))}`,
  });

  if (Array.isArray(payload)) {
    res.status(status).json(payload);
    return;
  }
  res.sendStatus(status);
};

export default responseSuccess;
