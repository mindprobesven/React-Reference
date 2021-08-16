"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const idValidationSchema = express_validator_1.checkSchema({
    id: {
        trim: true,
        isLength: {
            options: { min: 24, max: 24 },
            errorMessage: 'ID must be a 24 byte hex string',
            bail: true,
        },
        isAlphanumeric: {
            errorMessage: 'ID must be a 24 byte hex string',
            bail: true,
        },
    },
});
exports.default = idValidationSchema;
//# sourceMappingURL=id.js.map