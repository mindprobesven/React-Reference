"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const error_1 = __importDefault(require("../responseHandlers/error"));
const validatePostRequest = (validationSchema) => async (req, res, next) => {
    if (req.get('Content-Type') === 'application/json'
        && req.is('application/json') === 'application/json'
        && req.accepts('application/json') === 'application/json') {
        await validationSchema.run(req);
        const errors = express_validator_1.validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return error_1.default(req, res, 400, 'Validation failed for incoming data', errors.array());
    }
    return error_1.default(req, res, 406, '406 - Not acceptable', null);
};
exports.default = validatePostRequest;
//# sourceMappingURL=validatePostRequest.js.map