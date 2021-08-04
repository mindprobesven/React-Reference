"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("../config/config");
const app = express_1.default();
app.get('/', (req, res) => {
    console.log('Request');
    res.sendStatus(200);
});
function startExpressServer() {
    app.listen(config_1.EXPRESS_PORT, () => {
        console.log(`${config_1.ENV_TYPE} server is listening on port ${config_1.EXPRESS_PORT}!`);
    });
}
exports.default = startExpressServer;
//# sourceMappingURL=router.js.map