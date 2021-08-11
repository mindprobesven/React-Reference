/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Schema, model, Model, ObjectId, Types,
} from 'mongoose';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  validated: boolean;
  posts: ObjectId[];
  getUsers1: () => Promise<void>;
}

interface IUserModel extends Model<IUser> {
  getUsers2: () => Promise<void>;
}

const userSchema = new Schema<IUser, IUserModel, IUser>({
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
  posts: [Schema.Types.ObjectId],
  /* posts: {
    type: [Schema.Types.ObjectId],
    required: true,
    default: [],
  }, */
}, {
  timestamps: true,
});

userSchema.methods.getUsers1 = function getUsers1() {
  console.log('getUsers - Instance Method');

  return model('User')
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

const UserModel = model('User', userSchema);

export default UserModel;
