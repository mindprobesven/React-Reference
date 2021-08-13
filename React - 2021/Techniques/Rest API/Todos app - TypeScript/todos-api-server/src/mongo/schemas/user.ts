/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Schema, model, Model, ObjectId, Types,
} from 'mongoose';

// Schema interface
// Typings for schema properties and instance methods.
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  validated: boolean;
  getUsers1: () => Promise<void>;
}

// Model interface
// Typings for model static methods.
interface IUserModel extends Model<IUser> {
  getUsersByQuery: (query: Record<string, unknown>) => Promise<IUser[]>;
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
}, {
  timestamps: true,
});

userSchema.methods.getUsers1 = function getUsers1() {
  console.log('getUsers - Instance Method');
};

interface IQuery {
  searchFor?: string;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: string;
}

userSchema.statics.getUsersByQuery = function getUsersByQuery({
  searchFor,
  searchTerm,
  sortBy,
  sortOrder,
}: IQuery) {
  console.log(searchFor);
  console.log(searchTerm);
  console.log(sortBy);
  console.log(sortOrder);

  const queryObj: { [key: string]: unknown } = {};
  const sortObj: { [key: string]: unknown } = {};

  if (searchFor && searchTerm) {
    queryObj[searchFor] = new RegExp(`^${searchTerm}`, 'i');
  }

  if (sortBy && sortOrder) {
    sortObj[sortBy] = sortOrder;
  }

  console.log(queryObj);
  console.log(sortObj);

  return this
    .find(
      queryObj,
      { updatedAt: 0, __v: 0 },
      {
        sort: sortObj,
        lean: true,
      },
    );

  /* .find(filterObj)
    .sort({ [sortBy]: sortOrder })
    .select({
      updatedAt: 0,
      __v: 0,
    })
    .lean(); */
};

const UserModel = model('User', userSchema);

export default UserModel;
