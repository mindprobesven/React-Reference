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
};
userSchema.statics.getUsersByQuery = function getUsersByQuery({ searchFor, searchTerm, sortBy, sortOrder, }) {
    const config = {
        filter: {},
        select: { updatedAt: 0, __v: 0 },
        options: { sort: {}, lean: true },
    };
    if (searchFor && searchTerm) {
        config.filter[searchFor] = new RegExp(`^${searchTerm}`, 'i');
    }
    if (sortBy && sortOrder) {
        config.options.sort[sortBy] = sortOrder;
    }
    return this.find(config.filter, config.select, config.options);
};
const UserModel = mongoose_1.model('User', userSchema);
exports.default = UserModel;
//# sourceMappingURL=user.js.map