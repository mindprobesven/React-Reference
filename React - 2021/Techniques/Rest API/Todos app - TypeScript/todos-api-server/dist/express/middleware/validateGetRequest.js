"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("../responseHandlers/error"));
const validateGetRequest = (req, res, next) => {
    if (req.accepts('application/json') === 'application/json') {
        return next();
    }
    return error_1.default(req, res, 406, '406 - Not acceptable', null);
};
exports.default = validateGetRequest;
//# sourceMappingURL=validateGetRequest.js.map