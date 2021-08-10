"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const responseSuccess = (req, res, status, message, payload) => {
    logger_1.default.express.log({
        level: 'info',
        message: `[ ${req.method} ] ${status} - ${message} - ${req.originalUrl} - ${req.ip} - ${String(req.get('user-agent'))}`,
    });
    if (Array.isArray(payload)) {
        res.status(status).json(payload);
        return;
    }
    res.sendStatus(status);
};
exports.default = responseSuccess;
//# sourceMappingURL=success.js.map