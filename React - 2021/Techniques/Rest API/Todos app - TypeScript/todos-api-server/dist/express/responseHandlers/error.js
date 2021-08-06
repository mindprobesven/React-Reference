"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const responseError = ({ req, res, status = 400, message, payload, error, }) => {
    if (message) {
        logger_1.default.express.log({
            level: 'error',
            message: `[ ${req.method} ] ${status} - ${message} - ${req.originalUrl} - ${req.ip} - ${String(req.get('user-agent'))}`,
        });
        return res.status(status).send(message);
    }
    return res.sendStatus(status);
};
exports.default = responseError;
//# sourceMappingURL=error.js.map