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
userSchema.methods.isEmailDuplicate = function isEmailDuplicate() {
    const query = {
        filter: { email: new RegExp(this.email, 'i') },
        select: { email: 1 },
        options: { lean: true },
    };
    return new Promise((resolve, reject) => {
        mongoose_1.model('User')
            .findOne(query.filter, query.select, query.options)
            .then((foundDuplicate) => {
            if (foundDuplicate) {
                resolve(true);
            }
            resolve(false);
        })
            .catch((error) => reject(error));
    });
};
userSchema.statics.getUsersByQuery = function getUsersByQuery({ searchFor, searchTerm, sortBy, sortOrder, }) {
    const query = {
        filter: {},
        select: { updatedAt: 0, __v: 0 },
        options: { lean: true },
    };
    if (searchFor && searchTerm) {
        query.filter[searchFor] = new RegExp(`^${searchTerm}`, 'i');
    }
    if (sortBy && sortOrder) {
        query.options.sort = { [sortBy]: sortOrder };
    }
    return this.find(query.filter, query.select, query.options);
};
userSchema.statics.getUserById = function getUserById(id) {
    return this.findOne({ _id: id });
};
userSchema.statics.deleteUserById = function deleteUserById(id) {
    return new Promise((resolve, reject) => {
        this.deleteOne({ _id: id })
            .then((result) => {
            if (result.deletedCount && result.deletedCount > 0) {
                resolve(true);
            }
            resolve(false);
        })
            .catch((error) => reject(error));
    });
};
const UserModel = mongoose_1.model('User', userSchema);
exports.default = UserModel;
//# sourceMappingURL=user.js.map