"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    validated: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});
userSchema.methods.getUsers1 = function getUsers1() {
    console.log('getUsers - Instance Method');
    return mongoose_1.model('User')
        .find({})
        .select({
        updatedAt: 0,
        __v: 0,
    })
        .lean();
};
userSchema.statics.getUsers2 = function getUsers2() {
    console.log('getUsers - Static');
    return this
        .find({})
        .select({
        updatedAt: 0,
        __v: 0,
    })
        .lean();
};
const UserModel = mongoose_1.model('User', userSchema);
exports.default = UserModel;
//# sourceMappingURL=user.js.map