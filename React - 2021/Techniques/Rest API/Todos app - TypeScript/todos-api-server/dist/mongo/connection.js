"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = __importDefault(require("process"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config/config");
const logger_1 = __importDefault(require("../utils/logger"));
class Mongo {
    constructor() {
        this.initEventListeners = () => {
            const db = mongoose_1.default.connection;
            const handleReadyStateStatusChange = () => {
                switch (db.readyState) {
                    case 0:
                        this.isConnected = false;
                        logger_1.default.mongo.log({
                            level: 'info',
                            message: 'Disconnected!',
                        });
                        break;
                    case 1:
                        this.isConnected = true;
                        logger_1.default.mongo.log({
                            level: 'info',
                            message: 'Connected!',
                        });
                        break;
                    case 2:
                        logger_1.default.mongo.log({
                            level: 'info',
                            message: 'Connecting...',
                        });
                        break;
                    case 3:
                        logger_1.default.mongo.log({
                            level: 'info',
                            message: 'Disconnecting...',
                        });
                        break;
                    case 4:
                        logger_1.default.mongo.log({
                            level: 'error',
                            message: 'Invalid credentials!',
                        });
                        break;
                    default:
                        logger_1.default.mongo.log({
                            level: 'error',
                            message: 'Unknown readyState!',
                        });
                }
            };
            const handleConnectionStatusChange = (event) => {
                switch (event) {
                    case 'reconnected':
                        logger_1.default.mongo.log({
                            level: 'info',
                            message: 'Reconnected to database successfully!',
                        });
                        break;
                    case 'reconnectFailed':
                        logger_1.default.mongo.log({
                            level: 'error',
                            message: 'Reconnect failed!',
                        });
                        break;
                    case 'error':
                        logger_1.default.mongo.log({
                            level: 'error',
                            message: 'A connection error ocurred!',
                        });
                        break;
                    default:
                        logger_1.default.mongo.log({
                            level: 'error',
                            message: 'Unknown error event!',
                        });
                }
            };
            db.on('connecting', handleReadyStateStatusChange)
                .on('connected', handleReadyStateStatusChange)
                .on('disconnecting', handleReadyStateStatusChange)
                .on('disconnected', handleReadyStateStatusChange)
                .on('invalid credentials', handleReadyStateStatusChange);
            db.on('reconnected', () => handleConnectionStatusChange('reconnected'))
                .on('reconnectFailed', () => handleConnectionStatusChange('reconnectFailed'))
                .on('error', () => handleConnectionStatusChange('error'));
            const gracefulExit = () => {
                db.close()
                    .then(() => {
                    logger_1.default.mongo.log({
                        level: 'info',
                        message: 'Graceful exit initiated. Connection to MongoDB closed.',
                    });
                    process_1.default.exit(0);
                })
                    .catch((error) => { throw error; });
            };
            process_1.default.on('SIGINT', gracefulExit)
                .on('SIGTERM', gracefulExit)
                .on('SIGUSR2', gracefulExit);
        };
        this.connectToDatabase = () => (new Promise((resolve, reject) => {
            mongoose_1.default.connect(config_1.MONGO_URI, config_1.MONGO_OPTIONS)
                .then(() => resolve(true))
                .catch((error) => {
                if (error instanceof Error) {
                    logger_1.default.mongo.log({
                        level: 'error',
                        message: `${error.name} ${error.message}`,
                    });
                    reject(error);
                }
            });
        }));
        this.isConnected = false;
    }
    static get isConnected() {
        if (this.mongo instanceof Mongo) {
            return this.mongo.isConnected;
        }
        return false;
    }
    static connect() {
        return new Promise((resolve) => {
            if (typeof this.mongo === 'undefined') {
                this.mongo = new Mongo();
                this.mongo.initEventListeners();
                this.mongo.connectToDatabase().then(() => resolve(true)).catch(() => resolve(false));
            }
        });
    }
}
exports.default = Mongo;
//# sourceMappingURL=connection.js.map