/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Schema, model, Model } from 'mongoose';

// Schema interface
// Typings for schema properties and instance methods.
export interface IUser {
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

const UserModel = model('User', userSchema);

export default UserModel;
