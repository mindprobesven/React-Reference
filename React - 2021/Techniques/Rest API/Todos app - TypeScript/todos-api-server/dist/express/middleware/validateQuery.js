"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const error_1 = __importDefault(require("../responseHandlers/error"));
const validateQuery = (validationSchema) => async (req, res, next) => {
    console.log('Middleware - validateQueryParams');
    await validationSchema.run(req);
    const errors = express_validator_1.validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return error_1.default(req, res, 400, 'Invalid query', errors.array());
};
exports.default = validateQuery;
//# sourceMappingURL=validateQuery.js.map