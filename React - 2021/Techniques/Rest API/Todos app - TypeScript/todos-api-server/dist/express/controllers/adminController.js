"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkMongoConnection_1 = __importDefault(require("../middleware/checkMongoConnection"));
const validateGetRequest_1 = __importDefault(require("../middleware/validateGetRequest"));
const validatePostRequest_1 = __importDefault(require("../middleware/validatePostRequest"));
const user_1 = __importDefault(require("../validationSchemas/user"));
const success_1 = __importDefault(require("../responseHandlers/success"));
const user_2 = __importDefault(require("../../mongo/schemas/user"));
class AdminController {
    constructor() {
        this.getUsers = async (req, res) => {
            try {
                const userDoc = new user_2.default();
                console.log(await userDoc.getUsers1());
                console.log(await user_2.default.getUsers2());
            }
            catch (error) {
                console.log(error);
            }
            success_1.default(req, res, 200, 'Sending user data', [{ first: 'Sven', last: 'Kohn' }]);
        };
        this.addUser = (req, res) => {
            console.log(req.body);
            success_1.default(req, res, 200, 'OK');
        };
        this.router = express_1.default.Router();
    }
    configure() {
        this.router.get('/users', [checkMongoConnection_1.default, validateGetRequest_1.default], this.getUsers);
        this.router.post('/user/add', [checkMongoConnection_1.default, validatePostRequest_1.default(user_1.default)], this.addUser);
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