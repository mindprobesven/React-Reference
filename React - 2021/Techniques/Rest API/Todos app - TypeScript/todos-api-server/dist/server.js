"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./express/app"));
const connection_1 = __importDefault(require("./mongo/connection"));
const logger_1 = __importDefault(require("./utils/logger"));
const initAPIServer = async () => {
    if (await app_1.default.start() === 'OK') {
        if (await connection_1.default.connect() === 'OK') {
            logger_1.default.express.log({
                level: 'info',
                message: 'The API server has started successfully!',
            });
        }
    }
};
void initAPIServer();
//# sourceMappingURL=server.js.map