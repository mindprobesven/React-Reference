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
    console.log(searchFor);
    console.log(searchTerm);
    console.log(sortBy);
    console.log(sortOrder);
    const queryObj = {};
    const sortObj = {};
    if (searchFor && searchTerm) {
        queryObj[searchFor] = new RegExp(`^${searchTerm}`, 'i');
    }
    if (sortBy && sortOrder) {
        sortObj[sortBy] = sortOrder;
    }
    console.log(queryObj);
    console.log(sortObj);
    return this
        .find(queryObj, { updatedAt: 0, __v: 0 }, {
        sort: sortObj,
        lean: true,
    });
};
const UserModel = mongoose_1.model('User', userSchema);
exports.default = UserModel;
//# sourceMappingURL=user.js.map