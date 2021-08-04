"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.MONGO_DB = exports.MONGO_OPTIONS = exports.EXPRESS_PORT = exports.ENV_TYPE = exports.ENV = void 0;
exports.ENV = process.env.NODE_ENV || 'development';
exports.ENV_TYPE = exports.ENV.charAt(0).toUpperCase() + exports.ENV.slice(1);
exports.EXPRESS_PORT = 5000;
exports.MONGO_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    family: 4,
    poolSize: 5,
    serverSelectionTimeoutMS: 3000,
    heartbeatFrequencyMS: 5000,
};
exports.MONGO_DB = 'todos-app';
exports.MONGO_URI = `mongodb://1localhost:27017/${exports.MONGO_DB}`;
//# sourceMappingURL=config.js.map