import { Model } from 'mongoose';
interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    validated: boolean;
    getUsers1: () => Promise<void>;
}
interface IUserModel extends Model<IUser> {
    getUsers2: () => Promise<void>;
}
declare const UserModel: IUserModel;
export default UserModel;
//# sourceMappingURL=user.d.ts.map