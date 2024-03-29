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
console.log('Loaded router module');
class ExpressServer {
    constructor() {
        this.express = express_1.default();
    }
    configure() {
        this.express.use(serve_favicon_1.default(path_1.default.join(__dirname, '../../public', 'favicon.ico')));
        this.express.use(requestLogger_1.default);
        this.express.get('/', (req, res) => {
            console.log('Request');
            res.sendStatus(200);
        });
    }
    listen() {
        return new Promise((resolve, reject) => {
            try {
                this.express.listen(config_1.EXPRESS_PORT, () => {
                    console.log(`${config_1.ENV_TYPE} server is listening on port ${config_1.EXPRESS_PORT}!`);
                    resolve(true);
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.name);
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
                this.server.listen().then(() => resolve(true)).catch((error) => resolve(false));
            }
        });
    }
}
exports.default = ExpressServer;
//# sourceMappingURL=router.js.map