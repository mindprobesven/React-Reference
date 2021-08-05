"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("../config/config");
console.log('Loaded router module');
const app = express_1.default();
class ExpressServer {
    constructor() {
        this.express = express_1.default();
    }
    configure() {
        this.express.get('/', (req, res) => {
            console.log('Request');
            res.sendStatus(200);
        });
    }
    static start() {
        return new Promise((resolve) => {
            if (typeof this.server === 'undefined') {
                this.server = new ExpressServer();
                this.server.configure();
                try {
                    this.server.express.listen(config_1.EXPRESS_PORT, () => {
                        console.log(`${config_1.ENV_TYPE} server is listening on port ${config_1.EXPRESS_PORT}!`);
                        resolve();
                    });
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.log(error.name);
                        console.log(error.message);
                    }
                }
            }
        });
    }
}
exports.default = ExpressServer;
//# sourceMappingURL=router.js.map