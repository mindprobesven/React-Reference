"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./express/router"));
void (async () => {
    await router_1.default.start();
    console.log('Here');
})();
//# sourceMappingURL=server.js.map