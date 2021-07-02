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
}, {
  timestamps: true,
});

userSchema.methods.checkExistingEmail = function checkExistingEmail(email) {
  return model('User')
    .findOne({ email: new RegExp(email, 'i') })
    .select('email')
    .lean();
};

userSchema.methods.addUser = function addUser(data) {
  const UserModel = model('User', userSchema);
  const newUserDoc = new UserModel({ ...data });
  return newUserDoc.save();
};

const UserModel = model('User', userSchema);
const userModelMethods = new UserModel();

module.exports = userModelMethods;
