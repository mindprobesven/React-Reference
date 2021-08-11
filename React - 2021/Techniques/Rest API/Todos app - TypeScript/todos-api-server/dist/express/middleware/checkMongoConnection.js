"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../mongo/connection"));
const error_1 = __importDefault(require("../responseHandlers/error"));
const checkMongoConnection = (req, res, next) => {
    if (connection_1.default.isConnected) {
        return next();
    }
    return error_1.default(req, res, 500, '500 - No database connection', null);
};
exports.default = checkMongoConnection;
//# sourceMappingURL=checkMongoConnection.js.map