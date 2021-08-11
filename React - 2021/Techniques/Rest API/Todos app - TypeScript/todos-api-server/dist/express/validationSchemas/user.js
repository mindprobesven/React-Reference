"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const express_validator_1 = require("express-validator");
const userValidationSchema = express_validator_1.checkSchema({
    email: {
        trim: true,
        notEmpty: {
            errorMessage: 'Email address not specified',
            bail: true,
        },
        isLength: {
            options: { max: 50 },
            errorMessage: 'Email address is too long',
            bail: true,
        },
        isEmail: {
            errorMessage: 'Invalid email address',
        },
        normalizeEmail: true,
    },
    firstName: {
        trim: true,
        notEmpty: {
            errorMessage: 'Not specified',
            bail: true,
        },
        isLength: {
            options: { max: 50 },
            errorMessage: 'Too long',
            bail: true,
        },
        custom: {
            options: (value) => {
                if (validator_1.default.isAlphanumeric(value, 'en-US', { ignore: ' -' })
                    || validator_1.default.isAlphanumeric(value, 'es-ES', { ignore: ' -' })
                    || validator_1.default.isAlphanumeric(value, 'de-DE', { ignore: ' -' })) {
                    return true;
                }
                throw new Error('Invalid characters');
            },
        },
    },
    lastName: {
        trim: true,
        notEmpty: {
            errorMessage: 'Not specified',
            bail: true,
        },
        isLength: {
            options: { max: 50 },
            errorMessage: 'Too long',
            bail: true,
        },
        custom: {
            options: (value) => {
                if (validator_1.default.isAlphanumeric(value, 'en-US', { ignore: ' -' })
                    || validator_1.default.isAlphanumeric(value, 'es-ES', { ignore: ' -' })
                    || validator_1.default.isAlphanumeric(value, 'de-DE', { ignore: ' -' })) {
                    return true;
                }
                throw new Error('Invalid characters');
            },
        },
    },
    validated: {
        optional: true,
        custom: {
            options: (value) => {
                if (validator_1.default.isBoolean(value.toString())) {
                    return true;
                }
                throw new Error('Must be a boolean');
            },
        },
    },
});
exports.default = userValidationSchema;
//# sourceMappingURL=user.js.map