"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, colorize, label, errors, printf, timestamp, } = winston_1.format;
const expressConsoleTransport = new winston_1.transports.Console({
    level: 'info',
    format: combine(label({ label: 'Express' }), errors({ stack: true }), colorize(), timestamp({
        format: 'HH:mm:ss',
    }), printf((info) => (`${String(info.timestamp)} [ ${String(info.label)} ] ${info.level}: ${info.message} ${typeof info.stack !== 'undefined' ? String(info.stack) : ''}`))),
});
const mongoConsoleTransport = new winston_1.transports.Console({
    level: 'info',
    format: combine(label({ label: 'Mongo' }), errors({ stack: true }), colorize(), timestamp({
        format: 'HH:mm:ss',
    }), printf((info) => (`${String(info.timestamp)} [ ${String(info.label)} ] ${info.level}: ${info.message} ${typeof info.stack !== 'undefined' ? String(info.stack) : ''}`))),
});
const logger = {
    express: winston_1.createLogger({
        transports: [
            expressConsoleTransport,
        ],
        exitOnError: false,
    }),
    mongo: winston_1.createLogger({
        transports: [
            mongoConsoleTransport,
        ],
        exitOnError: false,
    }),
};
exports.default = logger;
//# sourceMappingURL=logger.js.map