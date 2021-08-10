"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const responseError = (req, res, status, message, error) => {
    if (error instanceof Error) {
        logger_1.default.express.log({
            level: 'error',
            message: `[ ${req.method} ] ${status} - ${error.name} - ${error.message} - ${req.originalUrl} - ${req.ip} - ${String(req.get('user-agent'))}`,
        });
        res.status(status).send(`${error.name} - ${error.message}`);
    }
    if (Array.isArray(error) && typeof message === 'string') {
        logger_1.default.express.log({
            level: 'error',
            message: `[ ${req.method} ] ${status} - ${message} - ${req.originalUrl} - ${req.ip} - ${String(req.get('user-agent'))}`,
        });
        res.status(status).json({ error });
    }
    if (error === null && typeof message === 'string') {
        logger_1.default.express.log({
            level: 'error',
            message: `[ ${req.method} ] ${status} - ${message} - ${req.originalUrl} - ${req.ip} - ${String(req.get('user-agent'))}`,
        });
        res.status(status).send(message);
    }
};
exports.default = responseError;
//# sourceMappingURL=error.js.map