/* eslint-disable max-len */
/* eslint-disable new-cap */
const { createLogger, transports, format } = require('winston');

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
      `${info.timestamp} [ ${info.label} ] ${info.level}: ${info.message} ${typeof info.stack !== 'undefined' ? info.stack : ''}`
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
      `${info.timestamp} [ ${info.label} ] ${info.level}: ${info.message} ${typeof info.stack !== 'undefined' ? info.stack : ''}`
    )),
  ),
});

const logger = {
  express: new createLogger({
    transports: [
      expressConsoleTransport,
    ],
    exitOnError: false,
  }),
  mongo: new createLogger({
    transports: [
      mongoConsoleTransport,
    ],
    exitOnError: false,
  }),
};

module.exports = logger;
