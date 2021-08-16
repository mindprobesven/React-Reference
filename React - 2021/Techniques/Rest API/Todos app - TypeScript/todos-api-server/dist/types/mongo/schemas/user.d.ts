import { Model, Document } from 'mongoose';
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    validated: boolean;
    isEmailDuplicate: () => Promise<boolean>;
}
interface IUserModel extends Model<IUser> {
    getUsersByQuery: (query: Record<string, unknown>) => Promise<IUser[]>;
    getUserById: (id: string) => Promise<IUser>;
    deleteUserById: (id: string) => Promise<boolean>;
}
declare const UserModel: IUserModel;
export default UserModel;
//# sourceMappingURL=user.d.ts.map