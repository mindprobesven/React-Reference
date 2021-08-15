import { Model } from 'mongoose';
export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    validated: boolean;
    isEmailDuplicate: () => Promise<boolean>;
}
interface IUserModel extends Model<IUser> {
    getUsersByQuery: (query: Record<string, unknown>) => Promise<IUser[]>;
}
declare const UserModel: IUserModel;
export default UserModel;
//# sourceMappingURL=user.d.ts.map