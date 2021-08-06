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
const add = (num1, num2) => {
    console.log('Adding...');
    console.log(num1);
    console.log(num2);
    return num1 + num1;
};
console.log(add(5));
console.log(add(5, 10));
//# sourceMappingURL=server.js.map