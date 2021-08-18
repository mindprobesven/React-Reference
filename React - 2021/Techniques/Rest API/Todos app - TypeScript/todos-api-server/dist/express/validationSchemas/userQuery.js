"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const userQuerySchema = express_validator_1.checkSchema({
    searchFor: {
        in: ['query'],
        optional: true,
        isLength: {
            options: { min: 1, max: 25 },
            errorMessage: 'Invalid length',
            bail: true,
        },
        isAlpha: {
            options: ['en-US', { ignore: '-' }],
            errorMessage: 'Invalid characters',
            bail: true,
        },
    },
    searchTerm: {
        in: ['query'],
        optional: true,
        isLength: {
            options: { min: 1, max: 50 },
            errorMessage: 'Invalid length',
            bail: true,
        },
        isAlpha: {
            options: ['en-US', { ignore: '-' }],
            errorMessage: 'Invalid characters',
            bail: true,
        },
    },
    sortBy: {
        in: ['query'],
        optional: true,
        isLength: {
            options: { min: 1, max: 25 },
            errorMessage: 'Invalid length',
            bail: true,
        },
        isAlpha: {
            options: ['en-US', { ignore: '-' }],
            errorMessage: 'Invalid characters',
            bail: true,
        },
    },
    sortOrder: {
        in: ['query'],
        optional: true,
        toLowerCase: true,
        isLength: {
            options: { min: 3, max: 4 },
            errorMessage: 'Invalid length',
            bail: true,
        },
        isIn: {
            options: [['asc', 'desc']],
            errorMessage: 'Invalid value',
            bail: true,
        },
    },
});
exports.default = userQuerySchema;
//# sourceMappingURL=userQuery.js.map