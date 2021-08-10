"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const config_1 = require("../config/config");
const requestLogger_1 = __importDefault(require("./middleware/requestLogger"));
const defaultErrorHandler_1 = __importDefault(require("./middleware/defaultErrorHandler"));
const adminController_1 = __importDefault(require("./controllers/adminController"));
const error_1 = __importDefault(require("./responseHandlers/error"));
const logger_1 = __importDefault(require("../utils/logger"));
class ExpressServer {
    constructor() {
        this.express = express_1.default();
    }
    configure() {
        this.express.use(express_1.default.json());
        this.express.use(serve_favicon_1.default(path_1.default.join(__dirname, '../../public', 'favicon.ico')));
        this.express.use(requestLogger_1.default);
        this.express.use('/admin', adminController_1.default.create());
        this.express.get('*', (req, res) => error_1.default(req, res, 404, '404 - Bad Request', null));
        this.express.use(defaultErrorHandler_1.default);
    }
    listen() {
        return new Promise((resolve, reject) => {
            try {
                this.express.listen(config_1.EXPRESS_PORT, () => {
                    logger_1.default.express.log({
                        level: 'info',
                        message: `${config_1.ENV_TYPE} server is listening on port ${config_1.EXPRESS_PORT}!`,
                    });
                    resolve(true);
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.express.log({
                        level: 'error',
                        message: `${error.name} - ${error.message}`,
                    });
                    reject(error);
                }
            }
        });
    }
    static async start() {
        return new Promise((resolve) => {
            if (typeof this.server === 'undefined') {
                this.server = new ExpressServer();
                this.server.configure();
                this.server.listen().then(() => resolve(true)).catch(() => resolve(false));
            }
        });
    }
}
exports.default = ExpressServer;
//# sourceMappingURL=app.js.map