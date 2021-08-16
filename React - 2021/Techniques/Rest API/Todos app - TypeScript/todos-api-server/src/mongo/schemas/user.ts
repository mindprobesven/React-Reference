/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Schema, model, Model, Document,
} from 'mongoose';

// Schema interface
// Typings for schema properties and instance methods.
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  validated: boolean;
  isEmailDuplicate: () => Promise<boolean>;
}

// Model interface
// Typings for model static methods.
interface IUserModel extends Model<IUser> {
  getUsersByQuery: (query: Record<string, unknown>) => Promise<IUser[]>;
  getUserById: (id: string) => Promise<IUser>;
  deleteUserById: (id: string) => Promise<boolean>;
}

interface IFindQuery {
  filter: Record<string, unknown>;
  select: Record<string, number>;
  options: {
    sort?: Record<string, string>;
    lean: boolean;
  };
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

userSchema.methods.isEmailDuplicate = function isEmailDuplicate() {
  const query: IFindQuery = {
    filter: { email: new RegExp(this.email, 'i') },
    select: { email: 1 },
    options: { lean: true },
  };

  return new Promise((resolve, reject) => {
    model('User')
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

userSchema.statics.getUsersByQuery = function getUsersByQuery({
  searchFor,
  searchTerm,
  sortBy,
  sortOrder,
}: Record<string, string>) {
  const query: IFindQuery = {
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

userSchema.statics.getUserById = function getUserById(id: string) {
  return this.findOne({ _id: id });
};

userSchema.statics.deleteUserById = function deleteUserById(id: string) {
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

const UserModel = model('User', userSchema);

export default UserModel;
