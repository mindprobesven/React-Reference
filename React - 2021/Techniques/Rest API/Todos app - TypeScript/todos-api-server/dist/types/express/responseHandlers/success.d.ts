import express from 'express';
import { IUser } from '../../mongo/schemas/user';
declare const responseSuccess: (req: express.Request, res: express.Response, status: number, message: string, payload?: IUser[] | undefined) => void;
export default responseSuccess;
//# sourceMappingURL=success.d.ts.map