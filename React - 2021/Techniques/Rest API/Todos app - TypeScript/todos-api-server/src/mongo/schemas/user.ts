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

interface IQueryConfig {
  filter: Record<string, unknown>;
  select: Record<string, number>;
  options: {
    sort: Record<string, string>;
    lean: boolean;
  };
}

userSchema.statics.getUsersByQuery = function getUsersByQuery({
  searchFor,
  searchTerm,
  sortBy,
  sortOrder,
}: Record<string, string>) {
  const config: IQueryConfig = {
    filter: {},
    select: { updatedAt: 0, __v: 0 },
    options: { sort: {}, lean: true },
  };

  if (searchFor && searchTerm) {
    config.filter[searchFor] = new RegExp(`^${searchTerm}`, 'i');
  }

  if (sortBy && sortOrder) {
    config.options.sort[sortBy] = sortOrder;
  }

  return this.find(config.filter, config.select, config.options);
};

const UserModel = model('User', userSchema);

export default UserModel;
