import express from 'express';
interface IValidationSchema {
    run: (req: express.Request) => Promise<unknown[]>;
}
declare const validatePostRequest: (validationSchema: IValidationSchema) => (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
export default validatePostRequest;
//# sourceMappingURL=validatePostRequest.d.ts.map