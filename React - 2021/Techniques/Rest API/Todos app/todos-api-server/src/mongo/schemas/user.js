const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  user: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 50,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 50,
    validate: {
      validator: (value) => !/\d/.test(value),
      message: () => 'Must not contain a number',
    },
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 50,
    validate: {
      validator: (value) => !/\d/.test(value),
      message: () => 'Must not contain a number',
    },
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
