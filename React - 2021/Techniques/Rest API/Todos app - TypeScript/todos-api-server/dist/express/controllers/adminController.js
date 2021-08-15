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
const error_1 = __importDefault(require("../responseHandlers/error"));
const user_2 = __importDefault(require("../../mongo/schemas/user"));
class AdminController {
    constructor() {
        this.getUsers = async (req, res) => {
            try {
                const users = await user_2.default.getUsersByQuery({ ...req.query });
                success_1.default(req, res, 200, 'Sending user data', users);
            }
            catch (error) {
                if (error instanceof Error) {
                    error_1.default(req, res, 400, null, error);
                }
            }
        };
        this.addUser = async (req, res) => {
            try {
                const newUserDoc = new user_2.default({ ...req.body });
                const isDuplicate = await newUserDoc.isEmailDuplicate();
                if (isDuplicate) {
                    const validationError = [{
                            value: newUserDoc.email,
                            msg: 'Email exists',
                            param: 'email',
                            location: 'body',
                        }];
                    error_1.default(req, res, 400, 'Email exists', validationError);
                    return;
                }
                await newUserDoc.save();
                success_1.default(req, res, 200, 'New user created');
            }
            catch (error) {
                if (error instanceof Error) {
                    error_1.default(req, res, 400, null, error);
                }
            }
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