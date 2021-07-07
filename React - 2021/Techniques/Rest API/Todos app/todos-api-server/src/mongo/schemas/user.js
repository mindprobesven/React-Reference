const { Schema, model } = require('mongoose');

const userSchema = new Schema({
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
  posts: {
    type: [Schema.Types.ObjectId],
    required: true,
    default: [],
  },
}, {
  timestamps: true,
});

userSchema.methods.isEmailDuplicate = function isEmailDuplicate() {
  return new Promise((resolve, reject) => {
    model('User')
      .findOne({ email: new RegExp(this.email, 'i') })
      .select('email')
      .lean()
      .then((isDuplicate) => {
        if (isDuplicate) {
          resolve(true);
        }
        resolve(false);
      })
      .catch((error) => reject(error));
  });
};

userSchema.methods.deleteUserById = function deleteUserById(id) {
  return new Promise((resolve, reject) => {
    model('User').deleteOne({ _id: id })
      .then((result) => {
        if (result.deletedCount > 0) {
          resolve(true);
        }
        resolve(false);
      })
      .catch((error) => reject(error));
  });
};

userSchema.methods.getUserById = function getUserById(id) {
  return model('User').findOne({ _id: id });
};

userSchema.methods.getUsers = function getUsers({
  searchFor,
  searchTerm,
  sortBy,
  sortOrder,
}) {
  return model('User1')
    .find((() => {
      let filterObj = {};

      if (searchFor && searchTerm) {
        filterObj = {
          [searchFor]: new RegExp(`^${searchTerm}`, 'i'),
        };
      }
      return filterObj;
    })())
    .sort({ [sortBy]: sortOrder })
    .select({
      updatedAt: 0,
      __v: 0,
    })
    .lean();
};

const UserModel = model('User', userSchema);

module.exports = UserModel;
