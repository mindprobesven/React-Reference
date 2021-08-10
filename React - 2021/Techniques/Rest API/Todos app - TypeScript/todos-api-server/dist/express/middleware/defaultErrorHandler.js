"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("../responseHandlers/error"));
const defaultErrorHandler = (error, req, res, next) => {
    error_1.default(req, res, 500, null, error);
    next();
};
exports.default = defaultErrorHandler;
//# sourceMappingURL=defaultErrorHandler.js.map