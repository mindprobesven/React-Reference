const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 100,
    unique: true,
  },
}, {
  timestamps: true,
});

userSchema.methods.addUser = function addUser(data) {
  const UserModel = model('User', userSchema);
  const newUserDoc = new UserModel({ ...data });
  console.log(newUserDoc);
  return newUserDoc.save();
};

const UserModel = model('User', userSchema);
const userModelExport = new UserModel();

module.exports = userModelExport;
