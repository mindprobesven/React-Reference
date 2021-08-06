"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const requestLogger = (req, res, next) => {
    logger_1.default.express.log({
        level: 'info',
        message: `[ ${req.method} ] ${req.originalUrl} - ${req.ip} - ${String(req.get('user-agent'))}`,
    });
    next();
};
exports.default = requestLogger;
//# sourceMappingURL=requestLogger.js.map