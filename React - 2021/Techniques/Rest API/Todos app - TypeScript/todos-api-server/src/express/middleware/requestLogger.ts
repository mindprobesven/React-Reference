/* eslint-disable max-len */

import express from 'express';
import logger from '../../utils/logger';

const requestLogger = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  logger.express.log({
    level: 'info',
    message: `[ ${req.method} ] ${req.originalUrl} - ${req.ip} - ${String(req.get('user-agent'))}`,
  });
  next();
};

export default requestLogger;
