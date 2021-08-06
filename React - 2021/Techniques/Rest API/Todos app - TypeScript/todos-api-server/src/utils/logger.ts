/* eslint-disable max-len */

import { createLogger, transports, format } from 'winston';

const {
  combine, colorize, label, errors, printf, timestamp,
} = format;

const expressConsoleTransport = new transports.Console({
  level: 'info',
  format: combine(
    label({ label: 'Express' }),
    errors({ stack: true }),
    colorize(),
    timestamp({
      format: 'HH:mm:ss',
    }),
    printf((info) => (
      `${String(info.timestamp)} [ ${String(info.label)} ] ${info.level}: ${info.message} ${typeof info.stack !== 'undefined' ? String(info.stack) : ''}`
    )),
  ),
});

const mongoConsoleTransport = new transports.Console({
  level: 'info',
  format: combine(
    label({ label: 'Mongo' }),
    errors({ stack: true }),
    colorize(),
    timestamp({
      format: 'HH:mm:ss',
    }),
    printf((info) => (
      `${String(info.timestamp)} [ ${String(info.label)} ] ${info.level}: ${info.message} ${typeof info.stack !== 'undefined' ? String(info.stack) : ''}`
    )),
  ),
});

const logger = {
  express: createLogger({
    transports: [
      expressConsoleTransport,
    ],
    exitOnError: false,
  }),
  mongo: createLogger({
    transports: [
      mongoConsoleTransport,
    ],
    exitOnError: false,
  }),
};

export default logger;
