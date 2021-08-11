import express from 'express';
import { ValidationChain } from 'express-validator';
declare type ValidationSchema = ValidationChain[] & {
    run: (req: express.Request) => Promise<unknown[]>;
};
declare const validatePostRequest: (validationSchema: ValidationSchema) => (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
export default validatePostRequest;
//# sourceMappingURL=validatePostRequest.d.ts.map