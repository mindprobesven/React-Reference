"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("../responseHandlers/error"));
const defaultErrorHandler = (error, req, res, next) => {
    console.log('defaultErrorHandler');
    console.log(error.message);
    error_1.default(req, res, 'Error message only', null);
    error_1.default(req, res, null, error, 500);
    error_1.default(req, res, 'Mesage and error object', [{ error: 'bla' }]);
    next();
};
exports.default = defaultErrorHandler;
//# sourceMappingURL=defaultErrorHandler.js.map