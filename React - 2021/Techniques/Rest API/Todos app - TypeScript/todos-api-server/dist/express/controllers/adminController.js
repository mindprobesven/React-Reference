"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateGetRequest_1 = __importDefault(require("../middleware/validateGetRequest"));
const success_1 = __importDefault(require("../responseHandlers/success"));
class AdminController {
    constructor() {
        this.getAllUsers = (req, res) => {
            success_1.default(req, res, 200, 'Sending user data', [{ first: 'Sven', last: 'Kohn' }]);
        };
        this.router = express_1.default.Router();
    }
    configure() {
        this.router.get('/users', [validateGetRequest_1.default], this.getAllUsers);
    }
    static create() {
        if (typeof this.controller === 'undefined') {
            this.controller = new AdminController();
            this.controller.configure();
        }
        return this.controller.router;
    }
}
exports.default = AdminController;
//# sourceMappingURL=adminController.js.map