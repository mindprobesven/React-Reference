"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./express/app"));
const initAPIServer = async () => {
    const isListening = await app_1.default.start();
    if (isListening) {
        console.log('Listening...');
    }
    else {
        console.log('NOT Listening!');
    }
};
void initAPIServer();
//# sourceMappingURL=server.js.map