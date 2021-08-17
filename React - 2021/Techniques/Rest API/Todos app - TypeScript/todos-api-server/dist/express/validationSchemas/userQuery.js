"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const express_validator_1 = require("express-validator");
const userQuerySchema = express_validator_1.checkSchema({
    searchFor: {
        in: ['query'],
        optional: true,
        isLength: {
            options: { max: 25 },
            errorMessage: 'Too long',
            bail: true,
        },
        custom: {
            options: (value) => {
                if (validator_1.default.isAlphanumeric(value, 'en-US', { ignore: '-' })) {
                    return true;
                }
                throw new Error('Invalid characters');
            },
        },
    },
});
exports.default = userQuerySchema;
//# sourceMappingURL=userQuery.js.map